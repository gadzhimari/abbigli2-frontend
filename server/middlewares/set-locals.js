import { assetsUrl, getAssets } from '../lib/etc/assets';
import metriks from '../lib/etc/metriks';

const lang = process.env.LOCATION;

function setLocals(req, res, next) {
  res.locals.assets = getAssets();
  res.locals.assetsUrl = assetsUrl;
  res.locals.metriks = metriks[lang];
  res.locals.lang = lang;

  next();
}

export default setLocals;
