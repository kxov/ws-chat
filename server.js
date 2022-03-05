import WebSocket, { WebSocketServer } from 'ws';
import { readFileSync } from 'fs';
import { createServer } from 'http';

const index = readFileSync('./index.html', 'utf8');

const port = 6663;
const server = createServer((req, res) => {
    res.writeHead(200);
    res.end(index);
});

server.listen(port, () => {
    console.log(`Listen port ${port}`);
});

const wss = new WebSocketServer({ server });

const clients = new Set();
const messages = [];

wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`New connection from ${ip}!`);

    clients.add(ws);

    ws.on('message', (data, isBinary) => {
        for (const client of wss.clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        }
    });

    ws.on('close', () => {
        console.log(`Disconnected ${ip}`);

        clients.delete(ws);
    });
});
