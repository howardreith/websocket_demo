const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const UUID = require('uuid');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 8080;
const app = express();
const httpServer = require('http').createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.json());

const client = redis.createClient();
client.configs = {
  port: '6379'
};

const io = require('socket.io')(httpServer, {
  origin: "http://localhost:3000",
  methods: ['GET', 'POST'],
  cors: {
    origin: 'http://localhost:3000',
  }
});

authRoutes.signin(app, client);

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    const { message, username } = data;
    const messageUuid = UUID.v4();
    const messageInfo = {
      messageSender: username,
      message
    };
    console.log('====> messageUuid', messageUuid)
    client.hmset(messageUuid, messageInfo, redis.print);
    io.sockets.emit('receiveMessage', data);
  });
});

// Start the Server
httpServer.listen(port, function () {
  console.info('Server Started. Listening on *:' + port);
});

