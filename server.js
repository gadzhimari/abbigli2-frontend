require('babel-core/register');
require('dotenv').config();

['.css', '.less', '.styl', '.ttf', '.woff', '.woff2'].forEach(ext => require.extensions[ext] = () => {});
require('./server/server');
