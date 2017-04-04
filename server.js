require('babel-core/register');

['.css', '.less', '.styl', '.ttf', '.woff', '.woff2'].forEach(ext => require.extensions[ext] = () => {});
require('./server/server');
