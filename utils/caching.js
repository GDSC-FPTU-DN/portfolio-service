const redis = require('redis');

const client = redis.createClient();

client.on("error", function(error) {
    console.error(error);
    return null
});

const getFromCache = async (key) => {
    await client.connect()
    return await client.get(key)
}

const setFromCache = async (key, value) => {
    // await client.connect()
    await client.set(key, value)
}

module.exports = { getFromCache, setFromCache }