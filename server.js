import WebSocket, { WebSocketServer } from 'ws';

const port = 6663;

const wss = new WebSocketServer({ port });

wss.on('connection', function connection(ws, req) {

  ws.on('message', function message(data, isBinary) {

    for (const client of wss.clients) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
    }
  });

  console.log(`new connection ${req.socket.remoteAddress}!`);

});
