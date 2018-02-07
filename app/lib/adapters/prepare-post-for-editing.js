/**
 * Используется для подготовки данных о посте к форме редактирования
 * @param {Object} data - данные пришедшие с сервера
 * @return {Object}
 */
export default function preparePostForEditing(data) {
  return {
    ...data,
    tags: data.tags.join(' '),
    currentCategory: data.categories[0].slug,
    categories: data.categories[0].id,
    cityOptions: data.city && [{
      value: data.city.id,
      label: `${data.city.name}, ${data.city.country.name}`
    }],
    city: data.city && data.city.id
  };
}
