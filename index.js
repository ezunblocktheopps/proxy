const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
    proxy.web(req, res, { target: 'http://example.com' });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Proxy server running on port 3000');
});
