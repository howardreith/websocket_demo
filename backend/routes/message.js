const messageRepo = require('../repository/message');

module.exports = {
  getLast20Messages: function (app) {
    app.get('/last20messages', async (req, res) => {
      const messages = await messageRepo.getMessageInRange(0, 20);
      res.send({
        'status': 'OK',
        messages
      });
    });
  }
};