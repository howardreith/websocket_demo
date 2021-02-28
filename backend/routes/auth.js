const UUID = require('uuid');
const redis = require('redis');

module.exports = {
  signin: function (app, client) {
    app.post('/signin', (req, res) => {
      const username = req.body.username;
      const token = UUID.v4();
      client.set(username, token, redis.print);
      res.send({
        'status': 'OK',
        'token': token
      });
    });
  }
};