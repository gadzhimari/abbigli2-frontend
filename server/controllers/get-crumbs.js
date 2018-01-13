import getCatalogStore from '../lib/catalog/getCatalogStore';
import createCrumbs from '../lib/createCrumbs';

export default (req, res) => {
  getCatalogStore(['normalizedCategories', 'promo'], (result) => {
    const slugs = req.body.slugs;
    const crumbs = createCrumbs(slugs, ...result);

    if (!crumbs) {
      return res.status(404).send({ message: 'Not found' });
    }

    return res.send({ crumbs });
  });
};
