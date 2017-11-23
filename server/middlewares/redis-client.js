import redis from 'redis';

const client = redis.createClient({
  db: 1,
});

client.on('connect', () => {
  console.log('connected');
});

export default client;
