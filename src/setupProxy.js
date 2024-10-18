const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/email',
    createProxyMiddleware({
      target: 'http://149.18.103.156:4300',
      changeOrigin: true,
    })
  );
};
