import redisClient from '../../middlewares/redis-client';

const getKeyFromStore = async (key) => {
  const data = await redisClient.get(key);
  return data;
};

/**
 * Достает из хранилища данные по ключам
 *
 * @param {String[]} keys
 * @param {Function} callback
 *
 * @returns {Object}
 */
function getCatalog(keys) {
  return new Promise((res) => {
    const result = {};
    let loaded = 0;

    const next = (key, data) => {
      result[key] = JSON.parse(data);
      loaded += 1;

      if (loaded === keys.length) {
        res(result);
      }
    };

    keys.forEach(async (key) => {
      const data = await getKeyFromStore(key);
      next(key, data);
    });
  });
}

export default getCatalog;
