/**
 * Используется для преобразования массива категорий в массив опций для Select'a
 * @param {Array} categories
 * @returns {Array}
 */
export default function categoriesToOptions(categories) {
  return categories.map(category => ({
    value: category.id,
    label: category.title,
  }));
}
