import path from 'path';
import fs from 'fs';

import config from '../../config';

const { isProduction, isTesting } = config;

const defaultAssets = {
  main: {
    js: '/public/assets/bundle.js',
    css: '/public/assets/style.css',
  },
};

const useProductionAssets = isProduction || isTesting;

const assetsPath = path.resolve(__dirname, '../../../public/assets/assets.json');
const assets = useProductionAssets
  ? JSON.parse(fs.readFileSync(assetsPath, 'utf8'))
  : defaultAssets;

export const assetsUrl = useProductionAssets ? '' : 'http://localhost:8080';

export function getAssets() {
  return {
    js: assets.main.js,
    css: assets.main.css,
  };
}
