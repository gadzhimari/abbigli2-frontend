
/**
 * На основе массива slugs создает массив категорий
 * @param {String[]} slugs - массив ключей категорий
 * @param {Object} categories
 * @param {Object[]} categories.normalizedCategories - Объект нормализованных категорий
 *
 * @returns {Object[]|null}
 */
const createCrumbs = (slugs, { normalizedCategories }) => {
  const cat = normalizedCategories.entities.categories;

  const categoryNotExist = slugs.some(item => !(item in cat));

  if (categoryNotExist) {
    return null;
  }

  return slugs.map((slug) => {
    const current = cat[slug];

    current.children = current.children
      .map(catSlug => cat[catSlug])
      .filter(category => category.type !== 'promo');
    current.url = current.url;

    return current;
  });
};

export default createCrumbs;
