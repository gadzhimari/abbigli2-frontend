
/**
 * На основе массива slugs создает массив категорий
 * @param {Array} slugs - массив ключей категорий
 * @param {Object} categories - Объект нормализованных категорий
 * @param {Object} promo - Объект нормализованный промо-категорий
 */
const createCrumbs = (slugs, categories) => {
  const cat = categories.entities.categories;

  const categoryNotExist = slugs.some(item => !(item in cat));

  if (categoryNotExist) {
    return null;
  }

  return slugs.reduce((acc, cur) => {
    const targetCategories = cat;
    const current = targetCategories[cur];

    current.children = current.children.map(catSlug => targetCategories[catSlug]);
    current.url = current.view_on_site_url;

    acc.push(current);

    return acc;
  }, []);
};

export default createCrumbs;
