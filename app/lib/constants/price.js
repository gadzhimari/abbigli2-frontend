import { location } from '../../config';

export const RUB_PRICE_TEMPLATE = '? руб';
export const USD_PRICE_TEMPLATE = '$ ?';

export const PRICE_TEMPLATE_FOR_CURRENT_LOCATION = location === 'en' ?
  USD_PRICE_TEMPLATE : RUB_PRICE_TEMPLATE;
