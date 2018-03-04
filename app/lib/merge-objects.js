import pick from 'lodash/pick';

/**
 * Используется для перезаписи свойств объекта target свойствами объекта source
 * причем те свойства source которых нет в target игнорируются
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
export default function mergeObjects(target, source) {
  return {
    ...target,
    ...pick(source, Object.keys(target)),
  };
}
