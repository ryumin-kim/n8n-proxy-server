const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('n8n List/Delete Proxy is running 🚀');
});

// 📋 워크플로우 목록 조회
app.post('/proxy/list', async (req, res) => {
  const { n8nUrl, apiKey } = req.body;
  try {
    const cleanedUrl = n8nUrl.replace(/\/+$/, "");
    const response = await fetch(`${cleanedUrl}/api/v1/workflows`, {
      method: 'GET',
      headers: { 'X-N8N-API-KEY': apiKey },
    });
    const data = await response.json();
    res.status(response.status).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ 워크플로우 삭제
app.post('/proxy/delete', async (req, res) => {
  const { n8nUrl, apiKey, id } = req.body;
  try {
    const cleanedUrl = n8nUrl.replace(/\/+$/, "");
    const response = await fetch(`${cleanedUrl}/api/v1/workflows/${id}`, {
      method: 'DELETE',
      headers: { 'X-N8N-API-KEY': apiKey },
    });
    res.status(response.status).json({ message: 'Deleted', status: response.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`List/Delete Proxy running on port ${PORT}`));
