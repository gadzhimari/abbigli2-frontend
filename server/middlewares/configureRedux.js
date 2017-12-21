import configureStore from '../../app/store/configureStore';

module.exports = (req, res, next) => {
  req.redux = configureStore();

  next();
};
