import path from 'path';
import fs from 'fs';

const isProd = process.env.NODE_ENV === 'production';

const defaultAssets = {
  main: {
    js: '/public/assets/bundle.js',
    css: '/public/assets/style.css',
  },
};

const assetsPath = path.resolve(__dirname, '../../../public/assets/assets.json');
const assets = isProd
  ? JSON.parse(fs.readFileSync(assetsPath, 'utf8'))
  : defaultAssets;

export const assetsUrl = isProd ? '' : 'http://localhost:8080';

export function getAssets() {
  return {
    js: assets.main.js,
    css: assets.main.css,
  };
}
