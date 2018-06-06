/* eslint-disable import/no-mutable-exports */
import redis from 'redis';
import util from 'util';

import { isProduction, isTesting } from '../config';

const disableRedis = !isProduction && !isTesting && process.env.LOCAL_REDIS !== 'yes';
let client = {};

if (!disableRedis) {
  client = redis.createClient({
    db: process.env.REDIS_DB,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  client.get = util.promisify(client.get);

  client.on('connect', () => {
    console.log('connected');
  });
}

export const saveToRedis = (key, value) => {
  let valueToSave = value;

  if (typeof valueToSave !== 'string') {
    valueToSave = JSON.stringify(valueToSave);
  }

  console.log(`${key} saved`);

  client.set(key, valueToSave);
};

export default client;
