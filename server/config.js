import os from 'os';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';
const isRuLocation = process.env.LOCATION === 'ru';

export default {
  isProduction,
  isTesting,
  cpus: isProduction || isTesting ? os.cpus().length : 1,
  port: process.env.SERVER_PORT,
  sentryDns: process.env.SENTRY_DNS,
  gtmCode: isRuLocation ? 'GTM-N7PQ3CW' : 'GTM-P4452TF'
};
