const dotenv = require('dotenv');
const express = require('express');
const config = require('./../config/default');
const WebSocket = require('ws');
const connect = require('./utils/connect');
const router = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const monitor = require('express-status-monitor');
const compression = require('compression');
const http = require('http');

dotenv.config();

const port = config.port;
const host = config.host;
const protocol = config.protocol;

const app = express();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('A user connected');

  ws.on('message', (message) => {
    // Handle the message and broadcast it to all connected clients
    // ...

    // Example: Broadcasting the message to the appropriate chat room
    const messageData = JSON.parse(message);
    const { sender, receiver } = messageData;
    const chatRoom = `${sender.kindergartenId}-${receiver.kindergartenId}`;

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Broadcast the message only to clients in the same chat room
        if (client.chatRoom === chatRoom) {
          client.send(message);
        }
      }
    });
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// app.user
app.use(compression());

app.use(helmet());

app.use(monitor());

app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

app.listen(port, async () => {
  console.log(`App is running at ${protocol}://${host}:${port}`);
  await connect();
  app.use('/api', router);
});

app.locals.io = wss;
