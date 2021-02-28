const UUID = require('uuid');
const redis = require('redis');

module.exports = {
  sendMessage: function (app, client) {
    app.post('/sendMessage', (req, res) => {
      const message = req.body.message;
      const username = req.body.username;
      const usernameIsPresent = client.get(username);
      if (!usernameIsPresent) {
        res.status(401).json({error: "Cannot send message without username"})
      }
      const messageUuid = UUID.v4();
      const messageInfo = {
        messageSender: username,
        message: message
      };
      client.hmset(messageUuid, messageInfo, redis.print);
      res.send({
        'status': 'OK'
      });
    });
  }
};