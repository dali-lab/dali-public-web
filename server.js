import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Helper function to make Notion API requests
async function makeNotionRequest(endpoint, method = 'GET', body = null) {
  const notionApiKey = process.env.VITE_NOTION_API_KEY;
  
  if (!notionApiKey) {
    console.error('Notion API key is missing');
    throw new Error('Notion API key is not configured');
  }

  console.log('Making Notion API request:', {
    endpoint,
    method,
    hasBody: !!body,
    hasApiKey: !!notionApiKey,
    body: body
  });

  try {
    const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-02-22',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const responseText = await response.text();
    console.log('Raw Notion API response:', responseText);

    if (!response.ok) {
      console.error('Notion API error:', {
        status: response.status,
        statusText: response.statusText,
        responseText
      });
      throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${responseText}`);
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

// Proxy endpoint for Notion database queries
app.post('/api/notion/v1/databases/:databaseId/query', async (req, res) => {
  try {
    const { databaseId } = req.params;
    console.log('Received database query request:', {
      databaseId,
      body: req.body,
      hasApiKey: !!process.env.VITE_NOTION_API_KEY,
      headers: req.headers
    });

    // Ensure we have a valid request body
    const requestBody = req.body || {};
    console.log('Request body:', requestBody);

    const data = await makeNotionRequest(`databases/${databaseId}/query`, 'POST', requestBody);
    console.log('Notion API response:', data);
    
    if (!data) {
      throw new Error('No data received from Notion API');
    }

    res.json(data);
  } catch (error) {
    console.error('Error proxying to Notion:', error);
    // Ensure we always send a valid JSON response
    res.status(500).json({ 
      error: 'Failed to fetch from Notion API',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Proxy endpoint for Notion page details
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
    res.status(500).json({ error: 'Failed to fetch from Notion API' });
  }
});

// Proxy endpoint for Notion block children
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
    res.status(500).json({ error: 'Failed to fetch from Notion API' });
  }
});

// Serve the static files for all other routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 