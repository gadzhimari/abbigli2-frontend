import redis from 'redis';

console.log(process.env.REDIS_HOST, process.env.REDIS_PORT);

const client = redis.createClient({
  db: 1,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('connect', () => {
  console.log('connected');
});

export default client;
