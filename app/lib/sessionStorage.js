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
  let data = sessionStorage.getItem(key);
  return !!data ? JSON.parse(data) : defaultData;
}

/**
 * @param {String} prefix
  */
export function clearSessionStorageByPrefix(prefix) {
  let i = sessionStorage.length;
  let re = new RegExp(prefix);
  while(i--) {
    let key = sessionStorage.key(i);
    if(re.test(key)) {
      sessionStorage.removeItem(key);
    }
  }
}
