import configureStore from '../../app/store';

module.exports = (req, res, next) => {
  req.redux = configureStore();
  req.isGoogleBot = req.headers['user-agent'].match(new RegExp('googlebot', 'i'));

  next();
};
