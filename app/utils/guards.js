/* @flow */

process.env = Object.assign(process.env, {
  'NODE_ENV'                      : process.env.NODE_ENV,
  'SERVER_PORT'                   : process.env.SERVER_PORT,
  'CLIENT_DEVSERVER_PORT'         : process.env.CLIENT_DEVSERVER_PORT,
  'DISABLE_SSR'                   : process.env.DISABLE_SSR,
  'SERVER_BUNDLE_OUTPUT_PATH'     : process.env.SERVER_BUNDLE_OUTPUT_PATH,
  'CLIENT_BUNDLE_OUTPUT_PATH'     : process.env.CLIENT_BUNDLE_OUTPUT_PATH,
  'CLIENT_BUNDLE_ASSETS_FILENAME' : process.env.CLIENT_BUNDLE_ASSETS_FILENAME,
  'CLIENT_BUNDLE_HTTP_PATH'       : process.env.CLIENT_BUNDLE_HTTP_PATH,
  'CLIENT_BUNDLE_CACHE_MAXAGE'    : process.env.CLIENT_BUNDLE_CACHE_MAXAGE,

  'MAIL_DRIVER'     : process.env.MAIL_DRIVER,
  'MAIL_DOMAIN'     : process.env.MAIL_DOMAIN,
  'MAIL_HOST'       : process.env.MAIL_HOST,
  'MAIL_PORT'       : process.env.MAIL_PORT,
  'MAIL_USERNAME'   : process.env.MAIL_USERNAME,
  'MAIL_PASSWORD'   : process.env.MAIL_PASSWORD,
  'MAIL_SECRET'     : process.env.MAIL_SECRET,
  'MAIL_FROM'       : process.env.MAIL_FROM,
  'MAIL_ENCRYPTION' : process.env.MAIL_ENCRYPTION,
  'API_URL'         : process.env.API_URL,
});

export function notEmpty<T>(x : ?T, message : string) : T {
  if (x == null) {
    throw new Error(message);
  }

  return x;
}

export function envVarExists(envVarName : string) : string {
  const message =
    `The "${envVarName}" env variable was not found.  Please ensure you have ` +
    'set the environment variable. If you have but you are still seeing this ' +
    'error message then you may have forgotten to add the env variable to ' +
    'the "DefinePlugin" plugin within the webpack configFactory.';

  return notEmpty(process.env[envVarName], message);
}
