/**
 * Возвращает объект из свойст object указанных в keys
 * @param {Object} object
 * @param {Array} keys
 * @returns {Object}
 */
export function pick(object, keys) {
  return keys.reduce((acc, key) => {
    acc[key] = object[key];
    return acc;
  }, {});
}

/**
 * Используется для перезаписи свойств объекта target свойствами объекта source
 * причем те свойства source которых нет в target игнорируются
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
export function mergeObjects(target, source) {
  if (!source) {
    return target;
  }

  return {
    ...target,
    ...pick(source, Object.keys(target)),
  };
}
