/* eslint-disable import/prefer-default-export */

/**
 * Проверяет входит ли target в потомки elem или является ли он им
 * @param {HTMLElement} target - целевой элемент события
 * @param {*} elem - элемент для проверки на вхождение target
 */
export function isClickOutside(elem, target) {
  return target !== elem && !elem.contains(target);
}
