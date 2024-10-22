const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://149.18.103.156/api',  // O backend rodando na porta 8000
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  // Remove o /api do caminho antes de redirecionar
      },
    })
  );
};
