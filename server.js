require('babel-core/register');
require('dotenv').config();

global.window = undefined;

['.css', '.less', '.styl', '.ttf', '.woff', '.woff2']
  .forEach(ext => (require.extensions[ext] = () => {}));
require('./server/server');
