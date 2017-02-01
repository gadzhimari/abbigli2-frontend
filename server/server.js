import express from 'express';
import path from 'path';

import renderOnServer from './middleware/renderOnServer';

const app = express();

app.use(express.static('./public'));

app.set('views', path.join(__dirname, '/template'));

app.set('view engine', 'ejs');

app.use(renderOnServer);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
