const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://149.18.103.156/api',  
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',  
      },
    })
  );
};
