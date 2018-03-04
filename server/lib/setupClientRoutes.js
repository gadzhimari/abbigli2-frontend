import express from 'express';
import pages from '../../app/lib/pages';

const router = express.Router();

const routes = Object.keys(pages)
  .map(page => pages[page])
  .filter(page => page.action);

function createRoute(action) {
  return (req, res, next) => {
    const { requests, redux } = req;

    requests.push(redux.dispatch(action));

    next();
  };
}

export default function setupClientRoutes(app) {
  routes.forEach(({ path, action }) => {
    router.get(path, createRoute(action));
  });

  app.use(router);
}
