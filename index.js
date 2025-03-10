// Import required modules
const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    // Forward all requests to the target server
    proxy.web(req, res, { target: 'http://example.com' }); // Replace 'http://example.com' with your actual target
});

// Add error handling for the proxy
proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong. Please try again later.');
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
