const WebSocketServer = require("ws").Server;
    const express = require("express");
    const http = require("http");

    const app = express();
    const server = http.createServer(app);

    server.listen(8080);
    const wss = new WebSocketServer({server});
    wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        wss.clients.forEach(client=>client.send(message))
        console.log(message)
      });
    
      ws.send('something');
    });