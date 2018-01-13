import express from 'express';

import away from '../controllers/away';
import getCatalog from '../controllers/get-catalog';
import getCrumbs from '../controllers/get-crumbs';

const router = express.Router();

router.get('/node-api/catalog', getCatalog);
router.get('/node-api/category-tree', getCrumbs);
router.get('/away', away);

export default router;
