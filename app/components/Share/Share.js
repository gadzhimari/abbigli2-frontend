import PropTypes from 'prop-types';
import React from 'react';

import ShareButton from './Buttons/ShareButton';
import { location as lang } from 'config';

import './Share.styl';

const style = { display: 'inline-block' };

export default function Share({ postLink, buttonClass }) {
  const location = typeof window !== 'undefined' ? window.location : {};

  return (
    <div style={style}>
      <ShareButton
        className={buttonClass}
        provider="facebook"
        link={`https://www.facebook.com/sharer.php?u=${location.origin}${postLink}/`}
      />
      <ShareButton
        className={buttonClass}
        provider="pinterest"
        link={`https://www.pinterest.com/pin/create/button/?url=${location.origin}${postLink}/`}
      />
      {
        lang === 'ru'
        &&
        <ShareButton
          className={`${buttonClass} vkontakte`}
          provider="vk"
          link={`https://vk.com/share.php?url=${location.origin}${postLink}/`}
        />
      }
    </div>);
}

Share.propTypes = {
  postLink: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
};
