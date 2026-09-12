const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/demo.html';

    let filePath = path.join(__dirname, reqPath);
    let ext = path.extname(filePath).toLowerCase();
    let contentType = mimeTypes[ext] || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Fallback to demo.html if path not found
            fs.readFile(path.join(__dirname, 'demo.html'), (err2, fallbackContent) => {
                if (err2) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(fallbackContent, 'utf-8');
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Server is LIVE at: http://localhost:${PORT}/`);
    console.log(`🦟 Digital Mosquito: http://localhost:${PORT}/demo.html`);
    console.log(`========================================`);

    // Automatically open in user's default browser on Windows
    exec(`start http://localhost:${PORT}/demo.html`);
});
