export const location = process.env.LOCATION;
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_TESTING = process.env.NODE_ENV !== 'production';

export const DOMAIN_URL = process.env.DOMAIN_URL;
export const API_URL = `${DOMAIN_URL}/api/v1/`;
export const API_URL_V2 = `${DOMAIN_URL}/api/v2/`;
export const THUMBS_URL = process.env.THUMBS_URL;

export const SHOW_ADSENSE = !IS_DEVELOPMENT && !IS_TESTING && location === 'en';

export const IS_HOT_DEVELOPMENT = IS_DEVELOPMENT && module.hot;

export const appConfig = {
  title: 'Abbilgi',
  description: 'Abbilgi',
  head: {
    titleTemplate: '%s',
    meta: [
      { property: 'og:site_name', content: 'Abbilgi' },
      { property: 'og:image', content: `${DOMAIN_URL}/media/og-image.jpg` },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:title', content: 'Abbilgi' },
    ],
  },
};

export const FB_ID = location === 'en'
  ? '1738998542989048'
  : '1276251119056923';
export const GOOGLE_ID = '152791861668-te59cn5d3n0tpefmqe5av5egnr1ucvs4.apps.googleusercontent.com';
export const VK_ID = '5225447';
export const GOOGLE_AD_CLIENT_ID = 'ca-pub-8128249301004337';

export const socialGroupsUrl = {
  vk: 'https://vk.com/abbigli',
  ok: 'https://ok.ru/profile/571557312137',
  fb: location === 'en'
    ? 'https://www.facebook.com/Abbiglicom-your-display-for-outstanding-crafts-and-events-1719846614967924/?fc=f&showPageSuggestions&ref=bookmarks'
    : 'https://www.facebook.com/abbigli/',
  google: location === 'en'
    ? 'https://plus.google.com/107795879391360804625'
    : 'https://plus.google.com/u/0/110479061425529635009',
  pinterest: location === 'en'
    ? 'https://ru.pinterest.com/abbiglicom/'
    : 'https://ru.pinterest.com/Abbigliru/?etslf=5789&eq=abbi',
  youtube: location === 'en'
    ? 'https://www.youtube.com/channel/UCc_9xmwk6hVaT1IZaMo4f2Q'
    : 'https://www.youtube.com/channel/UC0P3XK_o0B-aRJFMMap7gLA'
};
