const redis = require('redis');
const client = redis.createClient();
client.configs = {
  port: '6379'
};

function signInUser(username) {
  client.set(username, true, redis.print);
}

module.exports = {
  signInUser
};