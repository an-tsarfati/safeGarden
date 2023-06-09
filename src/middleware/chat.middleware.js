const Chat = require('../models/chat.model');
const WebSocket = require('ws');

// Store connected clients
const connectedClients = new Set();

const websocketMiddleware = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('A user connected');

    // Add the connected client to the set
    connectedClients.add(ws);

    ws.on('message', async (data) => {
      // Handle incoming messages
      const { senderId, receiverId, kindergartenId, message } =
        JSON.parse(data);

      // Create a new chat message
      const chat = new Chat({
        role: 'sender',
        kindergartenId,
        userId: senderId,
        message,
        timeStamp: Date.timeStamp,
      });
      await chat.save();

      client.send(JSON.stringify(chat));
    });
  });
};

module.exports = websocketMiddleware;
