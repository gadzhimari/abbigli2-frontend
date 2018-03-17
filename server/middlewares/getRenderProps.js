import match from 'react-router/lib/match';
import getRoutes from '../../app/routes';

module.exports = (req, res, next) => {
  const location = req.newPath || req.url;
  const routes = getRoutes(req.redux);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    req.renderProps = {
      error,
      redirectLocation,
      renderProps
    };

    next();
  });
};
