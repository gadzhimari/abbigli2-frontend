/* global ga */
/* eslint-disable import/prefer-default-export */

/**
 * Обрабатываем переходы по страницам для google аналитики
 * @param {Object} location
 */
function googleSetPage(path) {
  if (typeof ga !== 'undefined') {
    ga('set', 'page', path);
    ga('send', 'pageview');
  }
}

/**
 * Устанавливаем слушатель на браузерную историю
 * @param {*} history - объект истории браузера
 */
export function createHistoryListener(history) {
  history.listen((location) => {
    googleSetPage(location.pathname);
  });
}
