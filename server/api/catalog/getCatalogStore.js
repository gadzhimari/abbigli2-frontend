import redisClient from '../../middlewares/redis-client';

const getKeyFromStore = (key, idx, callback) => {
  redisClient.get(key, (err, data) => {
    callback(idx, data);
  });
};

const getCatalog = (keys, callback) => {
  const result = [];
  let loaded = 0;

  const next = (idx, data) => {
    result[idx] = JSON.parse(data);
    loaded++;

    if (loaded === keys.length) {
      callback(result);
    }
  };

  keys.forEach((key, idx) => {
    getKeyFromStore(key, idx, next);
  });
};

export default getCatalog;
