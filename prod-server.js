const path = require('path');
const compression = require('compression');
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const apiProxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true,
  cookieDomainRewrite: { '.getanewsletter.com': 'localhost' }
});
const API_SERVER = 'https://api.getanewsletter.com';
const PORT = 80;

// Pass session cookies throw proxy response
apiProxy.on('proxyRes', proxyRes => {
  let existingCookies = proxyRes.headers['set-cookie'];
  let rewrittenCookies = [];

  if (existingCookies) {
    if (!Array.isArray(existingCookies)) {
      existingCookies = [existingCookies];
    }

    for (let i = 0; i < existingCookies.length; i += 1) {
      rewrittenCookies.push(existingCookies[i].replace(/;\s*?(Secure)/i, ''));
    }

    proxyRes.headers['Set-Cookie'] = rewrittenCookies;
  }
});

app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// proxy all requests that start with "/api"
app.all('/api/*', function(req, res) {
  // rewrite request URL
  req.url = req.url.replace('/api', '');
  apiProxy.web(req, res, { target: API_SERVER });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
