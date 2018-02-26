import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Image from '../../../components/Image';

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
        <Image
          className="avatar"
          src={postImg}
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
