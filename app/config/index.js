/* @flow */

// Contains all the configuration shared between our Server and Client.
// Please note that the DefinePlugin of webpack will inline/replace all the
// respective "process.env.*" variables below with the actual values.
// Therefore these config values then become a part of the server and client
// bundles - so please ensure you don't put sensitive config values in here.
// Most likely if you are dealing with a sensitive config value (e.g db pass)
// then it should go in the specific /src/server/config which will only be
// contained in the server bundle.

const isDevelopment = process.env.NODE_ENV === 'development';
export const IS_DEVELOPMENT = isDevelopment;
export const API_URL = 'http://beta.abbigli.ru/api/v1/';

export const IS_HOT_DEVELOPMENT = isDevelopment && module.hot;

export let appConfig = {
  title: 'Abbilgi',
  description: 'Abbilgi',
  head: {
    titleTemplate: '%s',
    meta: [
      {charset: 'utf-8'},
      {property: 'og:site_name', content: 'Abbilgi'},
      {property: 'og:image', content: '/media/og-image.jpg'},
      {property: 'og:locale', content: 'ru_RU'},
      {property: 'og:title', content: 'Abbilgi'},
    ]
  }
};