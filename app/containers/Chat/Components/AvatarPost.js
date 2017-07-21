import React from 'react';
import PropTypes from 'prop-types';

import { DOMAIN_URL } from 'config';

const AvatarPost = ({
  avatar,
  alt,
  postImg,
  postAlt,
}) => (
    <div>
      <div className="avatar">
        <img
          className="avatar__img"
          src={`${DOMAIN_URL}thumbs/unsafe/113x113/${postImg}`}
          alt={postAlt}
        />
      </div>
      <div className="avatar">
        {
          avatar
            ? <img className="avatar__img" src={`${DOMAIN_URL}thumbs/unsafe/113x113/${avatar}`} alt={alt} />
            : <img className="avatar__img" src="/images/svg/avatar.svg" alt={alt} />
        }
      </div>
    </div>
  );

AvatarPost.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.any]).isRequired,
  alt: PropTypes.string.isRequired,
  postAlt: PropTypes.string.isRequired,
  postImg: PropTypes.string.isRequired,
};

export default AvatarPost;
