import { SOCIAL_PROVIDERS } from '../constants/social';

export default function createSocialLink(provider, id) {
  return `${SOCIAL_PROVIDERS[provider].url}/${id}`;
}
