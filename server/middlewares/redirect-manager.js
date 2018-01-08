/* eslint-disable consistent-return */

import queryToString from '../lib/queryToString';
import deleteKeys from '../lib/deleteKeysFromObject';

const catalogRegexp = /^\/c(\/.+)/;

const redirectManager = (req, res, next) => {
  const url = req.originalUrl;
  const query = req.query;

  if (catalogRegexp.test(url)) {
    const to = url.replace(catalogRegexp, '$1');

    return res.redirect(301, to);
  }

  if (query.page === '1') {
    const newQuery = queryToString(deleteKeys(query, ['page']));
    const to = `${req.path}${newQuery}`;

    return res.redirect(301, to);
  }

  next();
};

export default redirectManager;
