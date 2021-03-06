/* eslint no-console: 0 */
import Raven from 'raven-js';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';

const logger = {
  info: (message) => {
    console.log(message);
  },
  error: (path, err) => {
    console.error(path, err);

    if (isProduction || isTesting) {
      Raven.captureException(err);
    }
  },
};

export default logger;
