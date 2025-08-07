const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url === '/events') {
        res.writeHead(200, {
            'Content-Type':'text/event-stream',
            'Cache-Content':'no-cache',
            'Connection':'keep-alive'
        });

        const interval = setInterval(() => {
            res.write('date: ${Date.now()}\n\n');
        },2000);

        req.on('close',() => {
            clearInterval(interval);
            res.end();
        });
    } else {
        res.writeHead(200);
        res.end('server is up');
    }
})

server.listen(3000,() => {
    console.log('server is running on port 3000');
})