import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Helper function to make Notion API requests
async function makeNotionRequest(endpoint, method = 'GET', body = null) {
  const response = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${process.env.VITE_NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-02-22',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

// Proxy endpoint for Notion database queries
app.post('/api/notion/v1/databases/:databaseId/query', async (req, res) => {
  try {
    const { databaseId } = req.params;
    const data = await makeNotionRequest(`databases/${databaseId}/query`, 'POST', req.body);
    res.json(data);
  } catch (error) {
    console.error('Error proxying to Notion:', error);
    res.status(500).json({ error: 'Failed to fetch from Notion API' });
  }
});

// Proxy endpoint for Notion page details
app.get('/api/notion/v1/pages/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
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