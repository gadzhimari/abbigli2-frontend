
/**
 * На основе массива slugs создает массив категорий
 * @param {String[]} slugs - массив ключей категорий
 * @param {Object} categories - Объект нормализованных категорий
 * @param {Object} promo - Объект нормализованный промо-категорий
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
    const targetCategories = cat;
    const current = targetCategories[slug];

    current.children = current.children.map(catSlug => targetCategories[catSlug]);
    current.url = current.url;

    return current;
  });
};

export default createCrumbs;
