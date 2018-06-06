import fs from 'fs';
import path from 'path';
import { assetsUrl, getAssets } from '../lib/etc/assets';
import metriks from '../lib/etc/metriks';

import { isTesting, isProduction } from '../config';

const lang = process.env.LOCATION;
const assets = getAssets();
let criticalCss = '';

if (isProduction || isTesting) {
  criticalCss = fs.readFileSync(path.resolve(__dirname, `../../public${assets.css}`));
}

/**
 * Промежуточный обработчик для установки переменных
 * которые можно использовать в шаблонах
 * пример использования в templates/index.ejs
 */
function setLocals(req, res, next) {
  const isBot = req.useragent.isBot;
  res.locals.assets = assets;
  res.locals.assetsUrl = assetsUrl;
  res.locals.metriks = isProduction ? metriks[lang] : '';
  res.locals.lang = lang;
  res.locals.criticalCss = isBot ? '' : criticalCss;
  res.locals.isBot = isBot;

  next();
}

export default setLocals;
