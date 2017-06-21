import React from 'react';

import ShareButton from '../Share/Buttons/ShareButton';
import { socialGroupsUrl, location } from 'config';

const SocialGroups = () => (
  <div className="social-buttons">
    <noindex><nofollow><ShareButton
      className="social-btn"
      provider="facebook"
      link={socialGroupsUrl.fb}
    /></nofollow></noindex>
    <noindex><nofollow><ShareButton
      className="social-btn"
      provider="pinterest"
      link={socialGroupsUrl.pinterest}
    /></nofollow></noindex>
    <noindex><nofollow><ShareButton
      className="social-btn google-plus"
      provider="google"
      link={socialGroupsUrl.google}
    /></nofollow></noindex>

    {
      location === 'ru'
      &&
      <noindex><nofollow><ShareButton
        className="social-btn vkontakte"
        provider="vk"
        link={socialGroupsUrl.vk}
      /></nofollow></noindex>
    }
    {
      location === 'ru'
      &&
      <noindex><nofollow><ShareButton
        className="social-btn"
        provider="odnoklassniki"
        link={socialGroupsUrl.ok}
      /></nofollow></noindex>
    }
  </div>
);

export default SocialGroups;
