
/**
 * Преобразует объект GET-параметров в строку
 * @param {Object} query
 * @returns {String}
 */
function queryToString(query) {
  return Object.keys(query)
    .reduce((a, b) => {
      const prefix = a.length === 0 ? '?' : '&';
      return `${a}${prefix}${b}=${query[b]}`;
    }, '');
}

export default queryToString;
