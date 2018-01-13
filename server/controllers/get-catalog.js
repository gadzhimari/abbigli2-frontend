import getCatalogStore from '../lib/catalog/getCatalogStore';

const catalogList = ['categories', 'normalizedCategories', 'promo', 'sections'];

export default (req, res) => {
  getCatalogStore(catalogList, ([categories, normalizedCategories, promo, sections]) => {
    res.send({
      categories,
      normalizedCategories,
      promo,
      sections,
    });
  });
};
