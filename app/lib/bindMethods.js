/* eslint-disable no-param-reassign */

/**
 * Используется для привязки контекста к методам объекта
 * @param {Object} context - контекст для привязки
 * @param {String[]} methods - массив названий методов объекта
 */
export default function bindMethods(context, methods) {
  methods.forEach((method) => {
    context.constructor.prototype[method] = context.constructor.prototype[method].bind(context);
  });
}
