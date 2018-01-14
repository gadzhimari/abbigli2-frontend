import React from 'react';
import Type from 'prop-types';

import SocialButton from './Buttons/SocialButton';

import {
  FB_ID,
  DOMAIN_URL,
  GOOGLE_ID,
  VK_ID,
  location,
} from '../../config';

const fbOauth = 'https://facebook.com/dialog/oauth';
const googleOauth = 'https://accounts.google.com/o/oauth2/v2/auth';
const vkOauth = 'https://oauth.vk.com/authorize';

const SocialLogin = ({ className }) => {
  const redirectTo = location && location.href;

  const fbLink = `${fbOauth}?client_id=${FB_ID}&state=${redirectTo}`;
  const googleLink = `${googleOauth}?client_id=${GOOGLE_ID}&response_type=code&scope=openid&state=${redirectTo}`;
  const vkLink = `${vkOauth}?client_id=${VK_ID}&response_type=code&display=popup&state=${redirectTo}`;

  return (
    <div className="buttons-social">
      <SocialButton
        socialLink={fbLink}
        DOMAIN_URL={DOMAIN_URL}
        provider="facebook"
        className={`facebook ${className}`}
      >
        {'Facebook'}
      </SocialButton>
      {
        location === 'en'
          ? <SocialButton
            socialLink={googleLink}
            DOMAIN_URL={DOMAIN_URL}
            provider="google"
            className={`google-plus ${className}`}
          >
            {'Google Plus'}
          </SocialButton>
          : <SocialButton
            socialLink={vkLink}
            DOMAIN_URL={DOMAIN_URL}
            provider="vk"
            className={`vkontakte ${className}`}
          >
            {'ВКонтакте'}
          </SocialButton>
      }
    </div>
  );
};

SocialLogin.propTypes = {
  className: Type.string,
};

export default SocialLogin;
