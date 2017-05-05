import React, { PropTypes } from 'react';

import { Icons } from 'components';

const SocialButton = ({
  socialLink,
  DOMAIN_URL,
  provider,
  children,
  className,
}) => (
  <a
    className={`button-social ${className}`}
    href={`${socialLink}${DOMAIN_URL}oauth/${provider}/`}
  >
    <div className="icon-wrap">
      {
        Icons.SocialIcons[provider]()
      }
    </div>
    { children }
  </a>
);

SocialButton.propTypes = {
  socialLink: PropTypes.string.isRequired,
  DOMAIN_URL: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default SocialButton;
