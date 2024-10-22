const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',  // O backend rodando na porta 8000
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  // Remove o /api do caminho antes de redirecionar
      },
    })
  );
};
