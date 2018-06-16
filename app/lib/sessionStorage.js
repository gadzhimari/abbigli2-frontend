/**
 * Session Storage Helper
 *
 * @param {String} key
 * @param {Object} data
 * @returns {Object}
 */
export function setItemToSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
  return data;
}

/**
 * @param {String} key
 * @param {Object} defaultData
 * @returns {Object}
 */
export function getItemFromSessionStorage(key, defaultData) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
}
