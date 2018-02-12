import React from 'react';
import PropTypes from 'prop-types';

import ShareButton from '../Share/Buttons/ShareButton';
import { socialGroupsUrl, location } from 'config';

const SocialGroups = ({
  wrapperClassName,
}) => (
  <div className={wrapperClassName}>
    <ShareButton
      className="social-btn"
      provider="facebook"
      href={socialGroupsUrl.fb}
    />
    <ShareButton
      className="social-btn"
      provider="pinterest"
      href={socialGroupsUrl.pinterest}
    />
    <ShareButton
      className="social-btn google-plus"
      provider="google"
      href={socialGroupsUrl.google}
    />

    {
      location === 'ru'
      &&
      <ShareButton
        className="social-btn vkontakte"
        provider="vk"
        href={socialGroupsUrl.vk}
      />
    }
    {
      location === 'ru'
      &&
      <ShareButton
        className="social-btn"
        provider="odnoklassniki"
        href={socialGroupsUrl.ok}
      />
    }
  </div>
);

SocialGroups.defaultProps = {
  wrapperClassName: 'social-buttons',
};

SocialGroups.propTypes = {
  wrapperClassName: PropTypes.string,
};

export default SocialGroups;
