import express from 'express';

import away from '../controllers/away';
import getCatalog from '../controllers/get-catalog';
import getCrumbs from '../controllers/get-crumbs';
import oauth from '../controllers/oauth';
import confirmResetPassword from
'../controllers/confirmResetPassword';
import confirmSignUp from '../controllers/confirmSignUp';

import setupAccessHeader from '../middlewares/setupAccessHeader';

const router = express.Router();

router.use('/node-api/*', setupAccessHeader);
router.get('/node-api/catalog', getCatalog);
router.get('/node-api/category-tree', getCrumbs);
router.get('/away', away);
router.get('/oauth/:social', oauth);
router.get('/registration/confirm', confirmSignUp);
router.get('/reset-password/confirm', confirmResetPassword);

export default router;
