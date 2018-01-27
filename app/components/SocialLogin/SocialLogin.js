import React from 'react';
import Type from 'prop-types';

import SocialButton from './Buttons/SocialButton';

import noop from '../../lib/noop';

import {
  FB_ID,
  GOOGLE_ID,
  VK_ID,
  location } from '../../config';

import {
  FACEBOOK_PROVIDER,
  VK_PROVIDER,
  GOOGLE_PROVIDER } from '../../lib/constants/social';

const fbOauth = 'https://facebook.com/dialog/oauth';
const googleOauth = 'https://accounts.google.com/o/oauth2/v2/auth';
const vkOauth = 'https://oauth.vk.com/authorize';

const SocialLogin = ({ className, onButtonClick }) => {
  const redirectTo = window.location && window.location.href;

  const fbLink = `${fbOauth}?client_id=${FB_ID}&state=${redirectTo}&redirect_uri=`;
  const googleLink = `${googleOauth}?client_id=${GOOGLE_ID}&response_type=code&scope=openid&state=${redirectTo}&redirect_uri=`;
  const vkLink = `${vkOauth}?client_id=${VK_ID}&response_type=code&display=popup&state=${redirectTo}&redirect_uri=`;

  return (
    <div className="buttons-social">
      <SocialButton
        socialLink={fbLink}
        provider={FACEBOOK_PROVIDER}
        className={`facebook ${className}`}
        onClick={onButtonClick}
      >
        {'Facebook'}
      </SocialButton>
      {
        location === 'en'
          ? <SocialButton
            socialLink={googleLink}
            provider={GOOGLE_PROVIDER}
            className={`google-plus ${className}`}
          >
            {'Google Plus'}
          </SocialButton>
          : <SocialButton
            socialLink={vkLink}
            provider={VK_PROVIDER}
            className={`vkontakte ${className}`}
            onClick={onButtonClick}
          >
            {'ВКонтакте'}
          </SocialButton>
      }
    </div>
  );
};

SocialLogin.propTypes = {
  className: Type.string,
  onButtonClick: Type.func,
};

SocialLogin.defaultProps = {
  onFbClick: noop,
  onVkClick: noop,
};

export default SocialLogin;
