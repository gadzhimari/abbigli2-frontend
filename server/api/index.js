import express from 'express';

import away from '../controllers/away';
import getCatalog from '../controllers/get-catalog';
import getCrumbs from '../controllers/get-crumbs';
import oauth from '../controllers/oauth';

const router = express.Router();

router.get('/node-api/catalog', getCatalog);
router.get('/node-api/category-tree', getCrumbs);
router.get('/away', away);
router.get('/oauth/:social', oauth);

export default router;
