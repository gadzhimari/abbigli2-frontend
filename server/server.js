global.window = {};

import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import renderOnServer from './middlewares/renderOnServer';
import oauthHandler from './middlewares/oauthHandling';

const app = express();

app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(cookieParser());
app.use(compression());

app.use(oauthHandler);
app.use(renderOnServer);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
