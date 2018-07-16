// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
    server
});


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

wss.on('connection', (ws) => {
    let onlineUsers = JSON.stringify({
        size: wss.clients.size,
        type: "userCount"
    })
    wss.broadcast(onlineUsers);

    let randomColor = Math.floor(Math.random() * 16777215).toString(16);


    ws.onmessage = (event) => {
        let incoming = JSON.parse(event.data);
        let outgoing = (incoming.type === "postMessage") ? ({
            username: incoming.username,
            content: incoming.content,
            id: uuid(),
            type: "incomingMessage",
            color: "#" + randomColor
        }) : ({
            username: incoming.username,
            content: incoming.content,
            type: "incomingNotification",
            id: uuid()
        })

        wss.broadcast(JSON.stringify(outgoing));
    }

    ws.on('close', () => {
        let onlineUsers = JSON.stringify({
            size: wss.clients.size,
            type: "userCount"
        })
        wss.broadcast(onlineUsers);
        console.log('Client disconnected')
    })
});