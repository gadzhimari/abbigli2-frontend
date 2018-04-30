/* global ga */
/* eslint-disable import/prefer-default-export */

/**
 * Обрабатываем переходы по страницам для google аналитики
 * @param {Object} location
 * @param {Strig} location.pathname
 */
export function googleSetPage({ pathname }) {
  if (typeof ga !== 'undefined') {
    ga('set', 'page', pathname);
    ga('send', 'pageview');
  }
}

/**
 * Отправляет в аналитику событие клика
 * @param {String} eventCategory - элемент с которым вазимодествуем
 * @param {String} eventLabel - описание действия
 */
export function gaSendClickEvent(eventCategory, eventLabel) {
  if (typeof ga !== 'undefined') {
    ga('send', 'event', eventCategory, 'click', eventLabel);
  }
}

/**
 * Отправляет в аналитику событие в виде объекта
 * @param {Object} eventObject - объект события
 */
export function gaSend(eventObject) {
  if (typeof ga !== 'undefined') {
    ga('send', eventObject);
  }
}
