import PropTypes from 'prop-types';
import React from 'react';

import ShareButton from './Buttons/ShareButton';
import { location as lang } from '../../config';

import {
  FACEBOOK_PROVIDER,
  VK_PROVIDER,
  PINTEREST_PROVIDER } from '../../lib/constants/social';

import './Share.styl';

const style = { display: 'inline-block' };

export default function Share({ postLink, buttonClass, onClick }) {
  const location = typeof window !== 'undefined' ? window.location : {};

  return (
    <div style={style}>
      <ShareButton
        className={buttonClass}
        provider={FACEBOOK_PROVIDER}
        onClick={onClick}
        href={`https://www.facebook.com/sharer.php?u=${location.origin}${postLink}/`}
      />
      <ShareButton
        className={buttonClass}
        provider={PINTEREST_PROVIDER}
        onClick={onClick}
        href={`https://www.pinterest.com/pin/create/button/?url=${location.origin}${postLink}/`}
      />
      {
        lang === 'ru'
        &&
        <ShareButton
          className={`${buttonClass} vkontakte`}
          provider={VK_PROVIDER}
          href={`https://vk.com/share.php?url=${location.origin}${postLink}/`}
          onClick={onClick}
        />
      }
    </div>);
}

Share.propTypes = {
  postLink: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
