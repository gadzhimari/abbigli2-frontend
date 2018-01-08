import express from 'express';

import getCatalogStore from './catalog/getCatalogStore';
import createCrumbs from '../lib/createCrumbs';

const router = express.Router();

const catalogList = ['categories', 'normalizedCategories', 'promo', 'sections'];

router.get('/node-api/catalog', (req, res) => {
  getCatalogStore(catalogList, ([categories, normalizedCategories, promo, sections]) => {
    res.send({
      categories,
      normalizedCategories,
      promo,
      sections,
    });
  });
});

router.get('/node-api/category-tree', (req, res) => {
  getCatalogStore(['normalizedCategories', 'promo'], (result) => {
    const slugs = req.body.slugs;
    const crumbs = createCrumbs(slugs, ...result);

    if (!crumbs) {
      return res.status(404).send({ message: 'Not found' });
    }

    return res.send({ crumbs });
  });
});

export default router;
