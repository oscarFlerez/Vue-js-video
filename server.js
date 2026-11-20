// Servidor para Render: sirve la app compilada (dist) y hace proxy de /api al backend.
// Evita CORS y permite desplegar como Web Service.
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const API_TARGET = process.env.API_PROXY_TARGET || 'https://users-management-api-orb0.onrender.com';

app.use('/api', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  pathRewrite: { '^/api': '/api' }
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, proxying /api to ${API_TARGET}`);
});