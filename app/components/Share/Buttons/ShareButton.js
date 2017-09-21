import React, { PropTypes } from 'react';

import { SocialIcons } from 'components/Icons';

const ShareButton = ({
  link,
  provider,
  className,
  onClick,
}) => (
  <a
    className={`${className} ${provider}`}
    href={link}
    target="_blank"
    rel="nofollow noopener noreferrer"
    onClick={onClick}
  >
    {
      SocialIcons[provider]()
    }
  </a>
);

ShareButton.defaultProps = {
  onClick: () => {},
  link: '',
};

ShareButton.propTypes = {
  link: PropTypes.string,
  provider: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ShareButton;
