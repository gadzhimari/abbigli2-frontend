import get from 'lodash/get';

import pages from '../../app/lib/pages';

const routesMap = new Map();

Object
  .keys(pages)
  .filter(key => pages[key].action)
  .forEach((key) => {
    const page = pages[key];

    routesMap.set(page.path, {
      ...page
    });
  });

function dataAdapter(req) {
  const { renderProps: { router } } = req.renderProps;
  return {
    params: router.params,
    token: req.cookies.id_token2
  };
}

export default function setupClientDataRequests(req, res, next) {
  const { renderProps } = req.renderProps;

  if (!renderProps) {
    next();
    return;
  }

  const { routes } = renderProps;
  const { path } = routes[routes.length - 1];
  const page = routesMap.get(path);

  if (page) {
    const { requests, redux } = req;
    const { actionArgs, action } = page;
    const data = dataAdapter(req);

    const args = actionArgs.map(argsPath => get(data, argsPath));
    requests.push(redux.dispatch(action(...args)));
  }

  next();
}
