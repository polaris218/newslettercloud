const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'https://api.gantest.com',
      changeOrigin: true,
      cookieDomainRewrite: '',
      secure: false,
      pathRewrite: {
        '^/api': ''
      },
      onProxyRes: (proxyRes, req, res) => {
        const sc = proxyRes.headers['set-cookie'];
        if (Array.isArray(sc)) {
          proxyRes.headers['set-cookie'] = sc.map(sc => {
            return sc.split(';')
              .filter(v => v.trim().toLowerCase() !== 'secure')
              .join('; ')
          });
        }
      },
    })
  )
}
