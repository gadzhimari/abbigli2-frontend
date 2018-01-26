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

/**
 * Отправляет в аналитику событие клика
 * @param {String} eventCategory - элемент с которым вазимодествуем
 * @param {String} eventLabel - описание действия
 */
export function gaSendClickEvent(eventCategory, eventLabel) {
  if (typeof ga !== 'undefined') {
    ga('send', 'event', eventCategory, 'click', eventLabel, { nonInteraction: 1 });
  }
}
