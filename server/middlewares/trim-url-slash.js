export default function trimSlash(req, res, next) {
  const slashOnEndRegexp = /\/$/;

  if (slashOnEndRegexp.test(req.path)) {
    const pathWithoutSlash = req.path.replace(slashOnEndRegexp, '');
    const pathToRedirect = req.originalUrl.replace(req.path, pathWithoutSlash);

    res.redirect(301, pathToRedirect);

    return;
  }

  next();
}
