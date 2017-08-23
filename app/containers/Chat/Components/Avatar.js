import React from 'react';
import PropTypes from 'prop-types';

import { DOMAIN_URL } from 'config';

const Avatar = ({
  avatar,
  alt,
}) => (
    <div className="avatar">
      {
        avatar
          ? <img className="avatar__img" src={`${DOMAIN_URL}thumbs/unsafe/113x113/${avatar}`} alt={alt} />
          : <img className="avatar__img" src="/images/svg/avatar.svg" alt={alt} />
      }
    </div>
  );

Avatar.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.any]).isRequired,
  alt: PropTypes.string.isRequired,
};

export default Avatar;
