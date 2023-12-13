const redis = require("redis");
require("dotenv").config();
const { REDIS_CONN } = process.env;
const redisClient = redis.createClient({
  url: REDIS_CONN,
});

redisClient.on("connect", (err) => {
  console.log("Redis connect successfully");
});

redisClient.on("error", (err) => {
  console.log("error:", err);
});

redisClient.connect().then();

module.exports = redisClient;
