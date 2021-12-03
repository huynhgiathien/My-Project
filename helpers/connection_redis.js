const redis = require('redis');

const client = redis.createClient();
client.on('connect', (err) => console.log('connected'));
client.on('ready', (err) => console.log('Redis to ready'));
client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();
(async () => {
    let pong = await client.ping();
    console.log(pong)

})();

module.exports = client
