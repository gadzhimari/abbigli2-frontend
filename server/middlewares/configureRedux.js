import configureStore from '../../app/store';

module.exports = (req, res, next) => {
  req.redux = configureStore();

  next();
};
