import React from 'react';

import ShareButton from '../Share/Buttons/ShareButton';
import { socialGroupsUrl, location } from 'config';

const SocialGroups = () => (
  <div className="social-buttons">
    <ShareButton
      className="social-btn"
      provider="facebook"
      link={socialGroupsUrl.fb}
    />
    <ShareButton
      className="social-btn"
      provider="pinterest"
      link={socialGroupsUrl.pinterest}
    />
    <ShareButton
      className="social-btn google-plus"
      provider="google"
      link={socialGroupsUrl.google}
    />

    {
      location === 'ru'
      &&
      <ShareButton
        className="social-btn vkontakte"
        provider="vk"
        link={socialGroupsUrl.vk}
      />
    }
    {
      location === 'ru'
      &&
      <ShareButton
        className="social-btn"
        provider="odnoklassniki"
        link={socialGroupsUrl.ok}
      />
    }
  </div>
);

export default SocialGroups;
