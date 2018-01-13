import redisClient from '../../middlewares/redis-client';

const getKeyFromStore = async (key) => {
  const data = await redisClient.get(key);
  return data;
};

const getCatalog = (keys, callback) => {
  const result = [];
  let loaded = 0;

  const next = (idx, data) => {
    result[idx] = JSON.parse(data);
    loaded += 1;

    if (loaded === keys.length) {
      callback(result);
    }
  };

  keys.forEach(async (key, idx) => {
    const data = await getKeyFromStore(key);
    next(idx, data);
  });
};

export default getCatalog;
