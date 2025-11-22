const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_KEY = process.env.GEMINI_KEY;

if (!GEMINI_KEY) {
  console.warn('Warning: GEMINI_KEY is not set. Set it in .env for the proxy to work.');
}

app.use(cors({ origin: true }));
app.use(express.json());

// Serve static files from the project root so the frontend and API share one origin.
const path = require('path');
const siteRoot = path.resolve(__dirname);
app.use(express.static(siteRoot));

// Fallback to index.html for SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.join(siteRoot, 'index.html'));
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    // Return the full response to the client so the frontend can pick the text
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err.message || err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
});
