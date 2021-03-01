const messageRepo = require('../repository/message');

module.exports = {
  getLast50Messages: function (app) {
    app.get('/last50messages', async (req, res) => {
      const messages = await messageRepo.getMessageInRange(0, 50);
      res.send({
        'status': 'OK',
        messages
      });
    });
  }
};