const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

const redis = require('redis');

const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const client = redis.createClient();
client.on("error", function(error) {
    console.error(error);
});
client.configs = {
    port: '6379'
};

// Start the Server
http.listen(port, function() {
    console.info('Server Started. Listening on *:' + port);
});

authRoutes.signin(app, client);
messageRoutes.sendMessage(app, client);

io.on('connection', function(socket) {

    // Fire 'send' event for updating Message list in UI
    socket.on('message', function(data) {
        io.emit('send', data);
    });

    // Fire 'count_chatters' for updating Chatter Count in UI
    socket.on('update_chatter_count', function(data) {
        io.emit('count_chatters', data);
    });
});