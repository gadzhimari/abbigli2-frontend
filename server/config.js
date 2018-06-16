import os from 'os';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';

export default {
  isProduction,
  isTesting,
  cpus: isProduction || isTesting ? os.cpus().length : 1,
  port: process.env.SERVER_PORT,
  sentryDns: process.env.SENTRY_DNS
};
