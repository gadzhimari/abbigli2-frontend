export default function trimSlash(req, res, next) {
  const slashAtEndWith = /(.)\/$/;


  if (slashAtEndWith.test(req.path)) {
    const pathWithoutSlash = req.path.replace(slashAtEndWith, '$1');
    const pathToRedirect = req.originalUrl.replace(req.path, pathWithoutSlash);

    res.redirect(301, pathToRedirect);

    return;
  }

  next();
}
