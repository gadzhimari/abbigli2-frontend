/**
 * @param {Object} target - Объект из которого нужно удалит свойства
 * @param {Array} keys - Массив ключей для удаления
 * @returns {Object} - Возвращает новый объект без указанных свойств
 */
function deleteKeys(target, keys) {
  return Object.keys(target)
    .filter(key => !keys.includes(key))
    .reduce((a, b) => {
      const res = { ...a };
      res[b] = target[b];

      return res;
    }, {});
}

export default deleteKeys;
