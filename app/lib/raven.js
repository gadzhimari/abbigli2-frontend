import Raven from 'raven-js';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';
const ravenDNS = process.env.SENTRY_DNS_CLIENT;

if ((isProduction || isTesting) && ravenDNS) {
  Raven
    .config(ravenDNS)
    .install();
}
