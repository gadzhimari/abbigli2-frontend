/* eslint-disable consistent-return */

const trailingSlash = /(.)\/(\?.+)?$/;

function trimSlash(req, res, next) {
  const url = req.originalUrl;

  if (trailingSlash.test(url)) {
    const to = url.replace(trailingSlash, '$1$2');

    return res.redirect(301, to);
  }

  next();
}

export default trimSlash;
