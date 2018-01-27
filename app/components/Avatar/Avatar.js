import React, { PureComponent } from 'react';
import Type from 'prop-types';

import Image from '../Image';

// TODO: После того, как сделаем svg спрайт
// нужно будет использовать его вместо инлайновой картинки
class Avatar extends PureComponent {
  static propTypes = {
    avatar: Type.string,
    thumbSize: Type.string,
    className: Type.string,
    imgClassName: Type.string,
    onClick: Type.func,
    Component: Type.oneOfType([Type.string, Type.object]),
    componentProps: Type.shape(),
  }

  static defaultProps = {
    Component: 'div',
    componentProps: {},
  }

  render() {
    const { avatar,
            thumbSize,
            className,
            imgClassName,
            onClick,
            Component,
            componentProps,
            ...imgProps } = this.props;

    const url = avatar || '/images/svg/avatar.svg';
    const avatarSize = avatar ? thumbSize : null;

    return (
      <Component
        className={className}
        onClick={onClick}
        {...componentProps}
      >
        <Image
          src={url}
          thumbSize={avatarSize}
          className={imgClassName}
          {...imgProps}
        />
      </Component>
    );
  }
}

export default Avatar;
