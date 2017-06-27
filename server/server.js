global.window = {};

import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import Raven from 'raven';

import renderOnServer from './middlewares/renderOnServer';
import oauthHandler from './middlewares/oauthHandling';
import geoLocation from './middlewares/geoLocation';
import configureRedux from './middlewares/configureRedux';
import handleGoogleCahceUrl from './middlewares/handleGoogleCahceUrl';

const app = express();
const PORT = process.env.SERVER_PORT;
const ravenDSN = process.env.SENTRY_DNS;

Raven.config(ravenDSN).install();

// Enable ip from proxy
app.enable('trust proxy');
// engine set up
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// Parsers and compressors
app.use(cookieParser());
app.use(compression());
// Middlewares
app.use(Raven.requestHandler());

app.use(oauthHandler);
app.use(configureRedux);
app.use(geoLocation);
app.use(handleGoogleCahceUrl);
app.use(renderOnServer);

if (process.env.NODE_ENV === 'production' && ravenDSN) {
  app.use(Raven.errorHandler());
}

// Start server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
