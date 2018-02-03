import fs from 'fs';
import path from 'path';
import { assetsUrl, getAssets } from '../lib/etc/assets';
import metriks from '../lib/etc/metriks';

const lang = process.env.LOCATION;
const isProduction = process.env.NODE_ENV === 'production';
const assets = getAssets();
let criticalCss = '';

if (isProduction) {
  criticalCss = fs.readFileSync(path.resolve(__dirname, `../../public${assets.css}`));
}

/**
 * Промежуточный обработчик для установки переменных
 * которые можно использовать в шаблонах
 * пример использования в templates/index.ejs
 */
function setLocals(req, res, next) {
  res.locals.assets = assets;
  res.locals.assetsUrl = assetsUrl;
  res.locals.metriks = isProduction ? metriks[lang] : '';
  res.locals.lang = lang;
  res.locals.criticalCss = criticalCss;

  next();
}

export default setLocals;
