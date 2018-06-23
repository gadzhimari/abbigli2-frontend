import omit from 'lodash/omit';
import { location } from '../../config';

import { __t } from '../../i18n/translator';

export const FACEBOOK_PROVIDER = 'facebook';
export const VK_PROVIDER = 'vk';
export const PINTEREST_PROVIDER = 'pinterest';
export const GOOGLE_PROVIDER = 'google';
export const ODNOKLASSNIKI_PROVIDER = 'odnoklassniki';

export const SOCIAL_TYPES_FOR_ANALITICS = {
  [FACEBOOK_PROVIDER]: 'FB',
  [VK_PROVIDER]: 'VK',
  [PINTEREST_PROVIDER]: 'Pinterest',
  [GOOGLE_PROVIDER]: 'Google',
  [ODNOKLASSNIKI_PROVIDER]: 'OK',
};

export const ALL_SOCIAL_PROVIDERS = {
  vk: { value: 'vk', label: __t('VK'), url: 'https://vk.com' },
  ok: { value: 'ok', label: __t('OK'), url: 'https://ok.ru/profile' },
  fb: { value: 'fb', label: 'Facebook', url: 'https://facebook.com' },
  gp: { value: 'gp', label: 'Google Plus', url: 'https://plus.google.com' },
};

export const EXCLUDED_SOCIAL_PROVIDERS = {
  en: ['vk', 'ok'],
  ru: [],
};

export const SOCIAL_PROVIDERS = omit(ALL_SOCIAL_PROVIDERS,
  EXCLUDED_SOCIAL_PROVIDERS[location]);

export const SOCIAL_PROVIDERS_REGEX_PATTERN = {
  ok: /(https?:\/\/)?(www\.)?(ok|odnoklassniki)\.ru\/profile\//,
  vk: /(https?:\/\/)?(www\.)?(vk|vkontakte)\.com\//,
  fb: /(https?:\/\/)?(www\.)?(facebook|fb)\.com\//,
  gp: /(https?:\/\/)?(www\.)?plus\.google\.com\/((u)\/\d\/)?/,
  pin: /(https?:\/\/)?(?:www\.)?(([a-z]){2}\.)?pinterest\.com\//,
};
