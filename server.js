import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

// Load environment variables
dotenv.config();

// Set NODE_ENV if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const app = express();
const port = process.env.PORT || 3000;

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  next();
});

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Notion-Version']
}));

app.use(express.json());

// Helper function to make Notion API requests
async function makeNotionRequest(endpoint, method = 'GET', body = null) {
  const notionApiKey = process.env.VITE_NOTION_API_KEY;
  
  if (!notionApiKey) {
    console.error('Notion API key is missing');
    throw new Error('Notion API key is not configured');
  }

  const url = `https://api.notion.com/v1/${endpoint}`;
  console.log('Making Notion API request:', {
    url,
    method,
    hasBody: !!body,
    hasApiKey: !!notionApiKey,
    body: body,
    env: process.env.NODE_ENV
  });

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-02-22',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const responseText = await response.text();
    console.log('Raw Notion API response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: responseText,
      env: process.env.NODE_ENV
    });

    if (!response.ok) {
      console.error('Notion API error:', {
        status: response.status,
        statusText: response.statusText,
        responseText,
        env: process.env.NODE_ENV
      });
      throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${responseText}`);
    }

    if (!responseText) {
      throw new Error('Empty response from Notion API');
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing Notion API response:', parseError);
      throw new Error('Invalid JSON response from Notion API');
    }
  } catch (error) {
    console.error('Error in makeNotionRequest:', error);
    throw error;
  }
}

// API Routes - these must come BEFORE the static file serving
app.post('/api/notion/v1/databases/:databaseId/query', async (req, res) => {
  try {
    const { databaseId } = req.params;
    console.log('Received database query request:', {
      databaseId,
      body: req.body,
      hasApiKey: !!process.env.VITE_NOTION_API_KEY,
      headers: req.headers,
      url: req.url,
      method: req.method,
      env: process.env.NODE_ENV
    });

    // Ensure we have a valid request body
    const requestBody = req.body || {};
    console.log('Request body:', requestBody);

    // Make the request to Notion
    const data = await makeNotionRequest(`databases/${databaseId}/query`, 'POST', requestBody);
    console.log('Notion API response:', data);
    
    if (!data) {
      throw new Error('No data received from Notion API');
    }

    // Send the response
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } catch (error) {
    console.error('Error proxying to Notion:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Notion API',
      details: error.message,
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV
    });
  }
});

app.get('/api/notion/v1/pages/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    console.log('Received page request:', {
      pageId,
      hasApiKey: !!process.env.VITE_NOTION_API_KEY
    });

    const data = await makeNotionRequest(`pages/${pageId}`);
    res.json(data);
  } catch (error) {
    console.error('Error proxying to Notion:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Notion API',
      details: error.message 
    });
  }
});

app.get('/api/notion/v1/blocks/:blockId/children', async (req, res) => {
  try {
    const { blockId } = req.params;
    console.log('Received block children request:', {
      blockId,
      hasApiKey: !!process.env.VITE_NOTION_API_KEY
    });

    const data = await makeNotionRequest(`blocks/${blockId}/children`);
    res.json(data);
  } catch (error) {
    console.error('Error proxying to Notion:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Notion API',
      details: error.message 
    });
  }
});

// Serve static files AFTER API routes
app.use(express.static('dist'));

// Handle client-side routing - this must come AFTER static file serving
app.get('*', (req, res) => {
  console.log('Serving index.html for route:', req.url);
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Notion API Key available:', !!process.env.VITE_NOTION_API_KEY);
  console.log('Current working directory:', process.cwd());
  console.log('Dist directory exists:', existsSync(path.join(process.cwd(), 'dist')));
}); 