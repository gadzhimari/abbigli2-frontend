/* eslint no-console: 0 */
import Raven from 'raven';
import cfg from './config';

const logger = {
  info: (message) => {
    console.log(message);
  },
  error: (path, err) => {
    console.error(path, err);

    if (cfg.isProduction) {
      Raven.captureException(err);
    }
  },
};

export default logger;
