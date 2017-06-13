import React from 'react';

import SocialButton from './Buttons/SocialButton';

import {
  FB_ID,
  DOMAIN_URL,
  GOOGLE_ID,
  VK_ID,
  location,
} from 'config';

const SocialLogin = () => {
  const fbLink = `https://facebook.com/dialog/oauth?client_id=${FB_ID}&redirect_uri=`;
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&response_type=code&redirect_uri=`;
  const vkLink = `https://oauth.vk.com/authorize?client_id=${VK_ID}&response_type=code&display=popup&redirect_uri=`;

  return (
    <div className="buttons-social">
      <SocialButton
        socialLink={fbLink}
        DOMAIN_URL={DOMAIN_URL}
        provider="facebook"
        className="facebook"
      >
        {'Facebook'}
      </SocialButton>
      {
        location === 'en'
          ? <SocialButton
            socialLink={googleLink}
            DOMAIN_URL={DOMAIN_URL}
            provider="google"
            className="google-plus"
          >
            {'Google Plus'}
          </SocialButton>
          : <SocialButton
            socialLink={vkLink}
            DOMAIN_URL={DOMAIN_URL}
            provider="vk"
            className="vkontakte"
          >
            {'ВКонтакте'}
          </SocialButton>
      }
    </div>
  );
};

export default SocialLogin;
