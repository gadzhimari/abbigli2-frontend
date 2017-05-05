import React, { PropTypes } from 'react';

import { Icons } from 'components';

const ShareButton = ({
  link,
  provider,
  className,
}) => (
  <a
    className={`${className} ${provider}`}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    {
      Icons.SocialIcons[provider]()
    }
  </a>
);

ShareButton.propTypes = {
  link: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ShareButton;
