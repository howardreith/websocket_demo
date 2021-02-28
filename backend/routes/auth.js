const redis = require('redis');

module.exports = {
  signin: function (app, client) {
    app.post('/signin', (req, res) => {
      const username = req.body.username;
      client.set(username, true, redis.print);
      res.send({
        'status': 'OK'
      });
    });
  }
};