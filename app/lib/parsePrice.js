const commaRegexp = new RegExp(',');

/**
 * Используется для парсинга цены перед отправкой на сервер
 * при создании/редактировании поста
 *
 * @param {String} price - цена
 *
 * @returns {Number}
 */
export default function parsePrice(price) {
  return typeof price === 'string' ?
    Number(price.replace(commaRegexp, '.')) : price;
}
