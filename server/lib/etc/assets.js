import path from 'path';
import fs from 'fs';

import { isProduction, isTesting } from '../../config';

const defaultAssets = {
  main: {
    js: '/public/assets/bundle.js',
    css: '/public/assets/style.css',
  },
};

const assetsPath = path.resolve(__dirname, '../../../public/assets/assets.json');
const assets = isProduction || isTesting
  ? JSON.parse(fs.readFileSync(assetsPath, 'utf8'))
  : defaultAssets;

export const assetsUrl = isProduction || isTesting ? '' : 'http://localhost:8080';

export function getAssets() {
  return {
    js: assets.main.js,
    css: assets.main.css,
  };
}
