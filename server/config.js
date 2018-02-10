import os from 'os';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  isProduction,
  cpus: isProduction ? os.cpus().length : 1,
  port: process.env.SERVER_PORT,
  sentryDns: process.env.SENTRY_DNS
};
