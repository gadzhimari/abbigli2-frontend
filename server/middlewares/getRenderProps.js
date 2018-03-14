import match from 'react-router/lib/match';
import routes from '../../app/routes';

module.exports = (req, res, next) => {
  const location = req.newPath || req.url;

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    req.renderProps = {
      error,
      redirectLocation,
      renderProps
    };

    next();
  });
};
