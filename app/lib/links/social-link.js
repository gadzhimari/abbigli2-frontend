import { SOCIAL_PROVIDERS, SOCIAL_PROVIDERS_REGEX_PATTERN } from '../constants/social';

/**
 * Строит абсолютный url-путь социальной сети включая имя аккаунта сети
 * @param {String} имя провайдера социальной сети
 * @param {String} имя пользователя или id
 * @returns {String}
 */
export function createSocialLink(provider, id) {
  return `${SOCIAL_PROVIDERS[provider].url}/${id}`;
}

/**
 * Определяет, содержит ли переданная строка url-адрес одного из провайдеров
 * социальной сети
 * @param {String} имя провайдера социальной сети
 * @param {String} искомая строка
 * @returns {Boolean}
 */
export function containsBaseUrl(provider, str) {
  const networkRegex = SOCIAL_PROVIDERS_REGEX_PATTERN[provider];

  return networkRegex.test(str);
}

/**
 * Извлекает id аккаунта из абсолютного url-адреса социальной сети
 * @param {String} имя провайдера социальной сети
 * @param {String} абсолютный url-адрес
 * @returns {String}
 */
export function getSocialId(provider, str) {
  const networkRegex = SOCIAL_PROVIDERS_REGEX_PATTERN[provider];

  return str.replace(networkRegex, '');
}
