/**
 * Возвращает объект get-параметров
 * @param {String} query - строка get-параметров
 */
export default function parseQuery(query) {
  return query
    .replace('?', '')
    .split('&')
    .map(item => item.split('='))
    .reduce((a, b) => Object.assign({}, a, {
      [b[0]]: b[1],
    })
    , {});
}
