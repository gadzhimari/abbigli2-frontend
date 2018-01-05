import configureStore from '../../app/store/configureStore';
import logger from '../logger';

module.exports = (req, res, next) => {
  req.redux = configureStore(logger);

  next();
};
