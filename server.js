import WebSocket, { WebSocketServer } from 'ws';

const port = 6663;

const wss = new WebSocketServer({ port });

const clients = new Set();

wss.on('connection', (ws, req) => {

    clients.add(ws);

    ws.on('message', (data, isBinary) => {

        for (const client of wss.clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        }
    });


    const ip = req.socket.remoteAddress;

    console.log(`new connection from ${ip}!`);
});
