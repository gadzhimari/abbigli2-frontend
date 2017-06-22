import React, { PropTypes } from 'react';

import { SocialIcons } from 'components/Icons';

const ShareButton = ({
  link,
  provider,
  className,
}) => (
  <a
    className={`${className} ${provider}`}
    href={link}
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    {
      SocialIcons[provider]()
    }
  </a>
);

ShareButton.propTypes = {
  link: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ShareButton;
