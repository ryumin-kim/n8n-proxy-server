const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// CORS 허용
app.use(cors());
// JSON 파싱
app.use(express.json());

// 테스트용 루트
app.get('/', (req, res) => {
  res.send('n8n Proxy Server is running 🚀');
});

// 워크플로우 생성
app.post('/proxy/create', async (req, res) => {
  const { n8nUrl, apiKey, workflow } = req.body;
  try {
    const response = await fetch(`${n8nUrl}/api/v1/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': apiKey,
      },
      body: JSON.stringify(workflow),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 워크플로우 목록 조회
app.post('/proxy/list', async (req, res) => {
  const { n8nUrl, apiKey } = req.body;
  try {
    const response = await fetch(`${n8nUrl}/api/v1/workflows`, {
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': apiKey,
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
