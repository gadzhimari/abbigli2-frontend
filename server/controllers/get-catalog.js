import getCatalogFromStore from '../lib/catalog/getCatalogStore';

const catalogList = [
  'categories',
  'normalizedCategories',
  'promo',
  'blogsCategories',
  'eventsCategories',
  'defaultCategories'
];

export default async function getCatalog(req, res) {
  const catalogData = await getCatalogFromStore(catalogList);
  res.send(catalogData);
}
