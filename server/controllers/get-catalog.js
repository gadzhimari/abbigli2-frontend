import getCatalogStore from '../lib/catalog/getCatalogStore';

const catalogList = [
  'categories', 'normalizedCategories', 'promo', 'blogsCategories', 'eventsCategories'
];

export default (req, res) => {
  getCatalogStore(catalogList, ([
    categories,
    normalizedCategories,
    promo,
    blogsCategories,
    eventsCategories
  ]) => res.send({
    categories,
    normalizedCategories,
    promo,
    blogsCategories,
    eventsCategories
  }));
};
