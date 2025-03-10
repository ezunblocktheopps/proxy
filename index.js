// Import required modules
const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    // Parse the query parameters from the request URL
    const query = url.parse(req.url, true).query;

    // Check if the 'target' query parameter is provided
    if (query.target) {
        const targetUrl = query.target;

        // Forward the request to the specified target URL
        proxy.web(req, res, { target: targetUrl }, (err) => {
            if (err) {
                console.error('Proxy error:', err.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to proxy the request. Please check the target URL.');
            }
        });
    } else {
        // Inform the user if no target URL is provided
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please specify a target URL using the "target" query parameter, e.g., /?target=http://example.com');
    }
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
    console.log(`Proxy server running on port ${port}. Use /?target=http://example.com to specify the target.`);
});
