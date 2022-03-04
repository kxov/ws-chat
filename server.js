import WebSocket, { WebSocketServer } from 'ws';

const port = 6663;

const wss = new WebSocketServer({ port });

wss.on('connection', (ws, req) => {

  ws.on('message', (data, isBinary) => {

    for (const client of wss.clients) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
    }
  });

  console.log(`new connection from ${req.socket.remoteAddress}!`);

});
