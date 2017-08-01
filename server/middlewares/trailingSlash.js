import { createQuery } from '../../app/utils/functions';

const mustTrailing = path => path.charAt(path.length - 1) === '/';

const getFullPath = req => `${req.path.slice(0, -1)}${createQuery(req.query)}`;

const redirectToTrailedPath = (res, path) => {
  res.redirect(301, path);
};

const trailingSlash = (req, res, next) => {
  if (mustTrailing(req.path)) {
    redirectToTrailedPath(res, getFullPath(req));
  } else {
    next();
  }
};

export default trailingSlash;
