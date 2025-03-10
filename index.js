// Import required modules
const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Forward requests back to itself
    proxy.web(req, res, { target: 'https://sigmi-proxy.onrender.com' }, (err) => {
        if (err) {
            console.error('Proxy error:', err.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Failed to proxy the request. Please try again.');
        }
    });
});

// Add error handling for the proxy server
proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Something went wrong. Please try again later.');
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Proxy server running and forwarding requests to itself on port ${port}`);
});
