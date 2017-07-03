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

SocialGroups.defaultProps = {
  wrapperClassName: 'social-buttons',
};

SocialGroups.propTypes = {
  wrapperClassName: PropTypes.string,
};

export default SocialGroups;
