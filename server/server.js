import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';

import Raven from 'raven';

import renderHtml from './middlewares/renderHtml';
import getRenderProps from './middlewares/getRenderProps';
import geoLocation from './middlewares/geoLocation';
import configureRedux from './middlewares/configureRedux';
import handleGoogleCahceUrl from './middlewares/handleGoogleCahceUrl';
import trimSlash from './middlewares/trim-url-slash';
import setLocals from './middlewares/set-locals';
import redirectManager from './middlewares/redirect-manager';
import setupUseragent from './middlewares/setupUseragent';
import setupDataRequests from './middlewares/setupDataRequests';
import setupClientDataRequests from './middlewares/setupClientDataRequests';
import handleRequests from './middlewares/handleRequests';
import fetchUserProfile from './middlewares/fetchUserProfile';

import routes from './api';
import cfg from './config';

global.document = null;

const app = express();

Raven.config(cfg.sentryDns).install();

// Enable ip from proxy
app.enable('trust proxy');
// engine set up
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));
// Parsers and compressors
app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());
// Middlewares
app.use(Raven.requestHandler());
app.use(useragent.express());

app.use(handleGoogleCahceUrl);
app.use(routes);
app.use(redirectManager);
app.use(trimSlash);
app.use(setLocals);
app.use(configureRedux);
app.use(geoLocation);
app.use(setupUseragent);
app.use(setupDataRequests);
app.use(fetchUserProfile);
app.use(getRenderProps);
app.use(setupClientDataRequests);

app.use(handleRequests);
app.use(renderHtml);

if (cfg.isProduction && cfg.sentryDns) {
  app.use(Raven.errorHandler());
}

export default app;
