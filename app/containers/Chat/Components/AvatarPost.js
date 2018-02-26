import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DOMAIN_URL } from 'config';
import Avatar from './Avatar';

class AvatarPost extends PureComponent {
  static propTypes = {
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.any]).isRequired,
    alt: PropTypes.string.isRequired,
    postAlt: PropTypes.string.isRequired,
    postImg: PropTypes.string.isRequired,
  };

  render() {
    const { avatar, alt, postImg, postAlt } = this.props;

    return (
      <div>
        <Avatar
          className="avatar"
          avatar={postImg}
          imgClassName="avatar__img"
          thumbSize="113x113"
          alt={postAlt}
        />
        <Avatar
          className="avatar"
          avatar={avatar}
          imgClassName="avatar__img"
          thumbSize="113x113"
          alt={alt}
        />
      </div>
    );
  }
}

export default AvatarPost;
