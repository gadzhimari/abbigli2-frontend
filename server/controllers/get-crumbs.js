import getCatalogStore from '../lib/catalog/getCatalogStore';
import createCrumbs from '../lib/createCrumbs';
import getPromo from '../lib/getPromo';

export default (req, res) => {
  getCatalogStore(['normalizedCategories', 'promo'], function getCrumbs(result) {
    const slugs = req.query.slugs;
    const crumbs = createCrumbs(slugs, ...result);

    if (!crumbs) {
      return res.status(404).send({ message: 'Not found' });
    }

    const promoCategories = result[1];
    const currentCategory = crumbs[crumbs.length - 1];

    const promo = getPromo(currentCategory, promoCategories);

    return res.send({ crumbs, promo });
  });
};
