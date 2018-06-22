import { SOCIAL_PROVIDERS, SOCIAL_PROVIDERS_REGEX_PATTERN } from '../constants/social';

export function createSocialLink(provider, id) {
  return `${SOCIAL_PROVIDERS[provider].url}/${id}`;
}

export function containsBaseUrl(provider, str) {
  const networkRegex = SOCIAL_PROVIDERS_REGEX_PATTERN[provider];

  return networkRegex.test(str);
}

export function getSocialId(provider, str) {
  const networkRegex = SOCIAL_PROVIDERS_REGEX_PATTERN[provider];

  return str.replace(networkRegex, '');
}
