import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ShareButton from './Buttons/ShareButton';
import { DOMAIN_URL, location } from '../../config';

import {
  FACEBOOK_PROVIDER,
  VK_PROVIDER,
  PINTEREST_PROVIDER,
} from '../../lib/constants/social';

import './Share.styl';

class Share extends PureComponent {
  static propTypes = {
    postLink: PropTypes.string.isRequired,
    buttonClass: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    media: PropTypes.string,
    description: PropTypes.string,
  };

  render() {
    const { postLink, buttonClass, media, description, onClick } = this.props;
    const url = `${DOMAIN_URL}${postLink}`;

    return (
      <div>
        <ShareButton
          className={buttonClass}
          provider={FACEBOOK_PROVIDER}
          onClick={onClick}
          href={`https://www.facebook.com/sharer.php?u=${url}`}
        />
        <ShareButton
          className={buttonClass}
          provider={PINTEREST_PROVIDER}
          onClick={onClick}
          href={`https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`}
        />
        {
          location === 'ru'
          &&
          <ShareButton
            className={`${buttonClass} vkontakte`}
            provider={VK_PROVIDER}
            href={`https://vk.com/share.php?url=${url}`}
            onClick={onClick}
          />
        }
      </div>
    );
  }
}

export default Share;
