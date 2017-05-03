let storage;

class storagePolyfill {
  setItem(key, data) {
    this.key = data;
  }

  getItem(key) {
    return this.key;
  }
}

try {
  storage = localStorage;
} catch (err) {
  storage = new storagePolyfill;
}

export function toUpperSnake(string) {
  return string.replace(/([A-Z])/g, $1 => `_${$1}`).toUpperCase();
}

export function setJsonToStorage(key, data) {
  storage.setItem(key, JSON.stringify(data));
  return data;
}

export function deleteFromStorage(key) {
  storage.removeItem(key);
}

export function getJsonFromStorage(value = 'id_token') {
  if (typeof document === 'undefined') {
    return null;
  }

  const Cookies = document.cookie
    .split('; ')
    .reduce((prev, cur) => {
      const next = prev;
      const curValues = cur.split('=');

      next[curValues[0]] = curValues[1];

      return next;
    }, {});

  return Cookies[value] || null;
}

/**
 * Assigns ids to array's elements
 * @param {Array} array initial array
 * @return {Array} array
 */
export function assignIds(array) {
  return array.map(element => Object.assign({}, element, { id: Symbol() }));
}

export function reverse(string) {
  return string.split('').reverse().join('');
}

function prependWithZero(date) {
  if (`${date}`.length === 2) return date;
  return `0${date}`
}

export function parseDate(formattedDate) {
  const format = /^(\d{1,2})([\/|\.])(\d{1,2})([\/|\.]\d{2,4})$/;
  if (!format.test(formattedDate)) return null;
  return new Date(formattedDate.replace(format, ($0, $1, $2, $3, $4) => $3 + $2 + $1 + $4));
}

export function formatDate(date) {
  if (!date) return '';
  date = new Date(date);
  return `${prependWithZero(date.getDate())}/${prependWithZero(date.getMonth() + 1)}/${date.getFullYear()}`;
}
