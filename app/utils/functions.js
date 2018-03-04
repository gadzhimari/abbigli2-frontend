import moment from 'moment';

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

export const createQuery = (queryObj) => {
  const keys = Object.keys(queryObj);

  if (keys.length === 0) return '';

  return keys.reduce((a, b) => {
    let next = a;

    if (queryObj[b]) {
      next = `${next}${a.length > 1 ? '&' : ''}${b}=${queryObj[b]}`;
    }

    return next;
  }, '?');
};

export const getMessagesGroups = (messages) => {
  const groups = [];
  let currentGroup;

  messages.forEach((message) => {
    const messageDate = moment(message.sent_at).format('LL');

    if (!currentGroup) {
      currentGroup = {
        date: messageDate,
        messages: [],
      };
    }

    if (currentGroup.date === messageDate) {
      currentGroup.messages.push(message);
    }

    if (currentGroup.date !== messageDate) {
      groups.push(currentGroup);

      currentGroup = {
        date: messageDate,
        messages: [message],
      };
    }
  });

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
};
