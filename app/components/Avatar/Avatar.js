import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Image from '../Image';

class Avatar extends PureComponent {
  static propTypes = {
    avatar: Type.string,
    thumbSize: Type.string,
    className: Type.string,
    imgClassName: Type.string,
  }

  render() {
    const { avatar, thumbSize, className, imgClassName, ...imgProps } = this.props;
    const url = avatar || '/images/svg/avatar.svg';
    const avatarSize = avatar ? thumbSize : null;

    return (
      <div className={className}>
        <Image
          src={url}
          thumbSize={avatarSize}
          className={imgClassName}
          {...imgProps}
        />
      </div>
    );
  }
}

export default Avatar;
