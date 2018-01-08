
/**
 * На основе массива slugs создает массив категорий
 * @param {Array} slugs - массив ключей категорий
 * @param {Object} categories - Объект нормализованных категорий
 * @param {Object} promo - Объект нормализованный промо-категорий
 */
const createCrumbs = (slugs, categories, promo) => {
  const cat = categories.entities.categories;
  const promoCat = promo.entities.categories;

  const categoryNotExist = slugs.some(item => !(item in cat) && !(item in promoCat));

  if (categoryNotExist) {
    return null;
  }

  return slugs.reduce((acc, cur) => {
    let targetCategories = cur in cat ? cat : promoCat;
    let current = Object.assign({}, targetCategories[cur]);

    if (current.is_promo) {
      targetCategories = promoCat;
      current = Object.assign({}, targetCategories[cur]);
    }

    if (current.children && current.children.length === 0 && cur in promoCat) {
      targetCategories = promoCat;
      current = Object.assign({}, targetCategories[cur]);
    }

    current.children = current.children.map(catSlug => targetCategories[catSlug]);
    current.url = current.view_on_site_url;

    acc.push(current);

    return acc;
  }, []);
};

export default createCrumbs;
