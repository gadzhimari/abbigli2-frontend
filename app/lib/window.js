/* eslint-disable import/prefer-default-export */

/**
 * Проверяет входит ли target в потомки element или является ли он им
 * @param {*} element - элемент для проверки на вхождение target
 * @param {HTMLElement} target - целевой элемент события
 * @returns {Boolean}
 */
export function isClickOutside(element, target) {
  return element !== target && !element.contains(target);
}
