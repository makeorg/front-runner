const proxy = require('http-proxy-middleware');
const conf = require('./configuration.js');

function relayResponseHeaders(proxyRes) {
  const modifiedResponse = proxyRes;
  if (!conf.proxyApiUrl.startsWith('https://') && modifiedResponse.headers['set-cookie']) {
    const cookies = modifiedResponse.headers['set-cookie']
      .map(cookie => cookie.replace(/; secure/gi, ''));
    modifiedResponse.headers['set-cookie'] = cookies;
  }
}

const options = {
  target: conf.apiUrl,
  headers: { Accept: 'application/json' },
  pathRewrite: {
    '^/api/': '/',
  },
  secure: false,
  changeOrigin: true,
  onProxyRes: relayResponseHeaders,
};

module.exports = proxy(options);
