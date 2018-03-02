/* eslint-disable import/prefer-default-export */
import isInternetExplorerBefore from './browser';

/**
 * Проверяет входит ли target в потомки element или является ли он им
 * @param {*} element - элемент для проверки на вхождение target
 * @param {HTMLElement} target - целевой элемент события
 * @returns {Boolean}
 */
export function isClickOutside(element, target) {
  return element !== target && !element.contains(target);
}

export function windowOpen(url, { name, width = 550, height = 400 }) {
  /* eslint-disable no-mixed-operators */
  const left = (window.outerWidth / 2)
    + (window.screenX || window.screenLeft || 0) - (width / 2);
  const top = (window.outerHeight / 2)
    + (window.screenY || window.screenTop || 0) - (height / 2);
  /* eslint-enable no-mixed-operators */

  const config = {
    height,
    width,
    left,
    top,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
  };

  const shareDialog = window.open(
    url,
    isInternetExplorerBefore(10) ? '' : name,
    Object.keys(config).map(key => `${key}=${config[key]}`).join(', '),
  );

  return shareDialog;
}
