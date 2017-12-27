/* eslint jsx-a11y/img-has-alt: 0 */

import React, { PureComponent } from 'react';
import Type from 'prop-types';

import { THUMBS_URL } from '../../config';

class Image extends PureComponent {
  static propTypes = {
    src: Type.string,
    thumbSize: Type.string,
  }

  render() {
    const {
      src,
      thumbSize,
      ...imageProps
    } = this.props;

    const url = thumbSize ? `${THUMBS_URL}unsafe/${thumbSize}/${src}` : src;

    return (
      <img
        src={url}
        {...imageProps}
      />
    );
  }
}

export default Image;
