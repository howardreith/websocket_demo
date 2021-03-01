const redis = require('redis');
const UUID = require('uuid');
const { promisify } = require("util");
const client = redis.createClient();
client.configs = {
  port: '6379'
};
const lrangeAsync = promisify(client.lrange).bind(client);
const getAsync = promisify(client.get).bind(client);
const hmgetAsync = promisify(client.hmget).bind(client);

function addMessageToDb(messageInfo) {
  const messageUuid = UUID.v4();
  client.hmset(messageUuid, messageInfo, redis.print);
  client.lpush('messages', messageUuid)
}

async function getMessageInRange(start = 0, end = 19) {
  const messageUuids = await lrangeAsync('messages', start, end);
  const messages = [];
  for (const messageUuid of messageUuids) {
    const object = {};
    object.message = (await hmgetAsync(messageUuid, 'message'))[0];
    object.messageSender = (await hmgetAsync(messageUuid, 'messageSender'))[0];
    messages.push(object)
  }
  return messages
}

module.exports = {
  addMessageToDb,
  getMessageInRange
};

