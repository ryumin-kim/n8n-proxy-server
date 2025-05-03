const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// CORS 허용
app.use(cors());
// JSON 파싱
app.use(express.json());

// 루트 확인용
app.get('/', (req, res) => {
  res.send('n8n Proxy Server is running 🚀');
});

// 워크플로우 목록 조회 (POST /proxy/list)
app.post('/proxy/list', async (req, res) => {
  const { n8nUrl, apiKey } = req.body;
  try {
    const cleanedUrl = n8nUrl.replace(/\/+$/, ""); // 끝에 슬래시 제거
    const response = await fetch(`${cleanedUrl}/api/v1/workflows`, {
      method: 'GET',
      headers: {
        'X-N8N-API-KEY': apiKey,
      }
    });
    const data = await response.json();
    res.status(response.status).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
