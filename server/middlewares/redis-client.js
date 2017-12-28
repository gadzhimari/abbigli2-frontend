import redis from 'redis';

const client = redis.createClient({
  db: 1,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('connect', () => {
  console.log('connected');
});

export const saveToRedis = (key, value) => {
  let valueToSave = value;

  if (typeof valueToSave !== 'string') {
    valueToSave = JSON.stringify(valueToSave);
  }

  console.log(`${key} saved`);

  client.set(key, valueToSave);
};

export default client;
