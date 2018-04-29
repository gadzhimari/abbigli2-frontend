import getCatalogStore from '../lib/catalog/getCatalogStore';

const catalogList = ['categories', 'normalizedCategories', 'promo', 'sections'];

export default (req, res) => {
  getCatalogStore(catalogList, function getCat([
    categories,
    normalizedCategories,
    promo,
    sections]
  ) {
    return res.send({
      categories,
      normalizedCategories,
      promo,
      sections,
    });
  });
};
