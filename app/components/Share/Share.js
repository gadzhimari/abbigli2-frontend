import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import ShareButton from './Buttons/ShareButton';
import { location as lang } from 'config';

import './Share.styl';

const style = { display: 'inline-block' };

function Share({ postLink, buttonClass }) {
  const location = window.location || {};

  const fbDialog = (e) => {
    e.preventDefault();

    window.FB.ui({
      method: 'share',
      href: `${location.origin}${postLink}`,
    }, () => {});
  };

  return (
    <div style={style}>
      <ShareButton
        className={buttonClass}
        provider="facebook"
        onClick={fbDialog}
      />
      <ShareButton
        className={buttonClass}
        provider="pinterest"
        data-pin-do="buttonPin"
        data-pin-custom="true"
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

export default pure(Share);
