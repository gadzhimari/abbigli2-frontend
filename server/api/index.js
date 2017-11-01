import expre  ss from 'express';

import getCatalogStore from './catalog/getCatalogStore';

const router = express.Router();

const catalogList = ['categories', 'normalizedCategories', 'promo', 'sections'];

router.use('/node-api/catalog', (req, res) => {
  getCatalogStore(catalogList, ([categories, normalizedCategories, promo, sections]) => {
    res.send({
      categories,
      normalizedCategories,
      promo,
      sections,
    });
  });
});

export default router;
