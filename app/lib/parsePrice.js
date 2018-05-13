const commaRegexp = new RegExp(',');

/**
 * Используется для парсинга цены перед отправкой на сервер
 * при создании/редактировании поста
 *
 * @param {String} price - цена
 *
 * @returns {Number|String}
 */
export default function parsePrice(price) {
  // Пока нет маски - заменяем запятую на точку ручками
  return Number(price.replace(commaRegexp, '.')) || price;
}
