import getCatalogFromStore from '../lib/catalog/getCatalogStore';
import createCrumbs from '../lib/createCrumbs';
import getPromo from '../lib/getPromo';

export default async function getCrumbs(req, res) {
  const result = await getCatalogFromStore(['normalizedCategories', 'promo']);

  const slugs = req.query.slugs;
  const crumbs = createCrumbs(slugs, result);

  if (!crumbs) {
    return res.status(404).send({ message: 'Not found' });
  }

  let { promo } = result;
  const currentCategory = crumbs[crumbs.length - 1];

  promo = getPromo(currentCategory, promo);

  return res.send({ crumbs, promo });
};
