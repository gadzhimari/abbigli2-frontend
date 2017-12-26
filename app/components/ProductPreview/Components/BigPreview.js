import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import classNames from 'classnames';

import { THUMBS_URL } from '../../../config';

class BigPreview extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.bool,
    index: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }

  render() {
    const { src, active, index, title, tags } = this.props;
    const alt = tags.join(' ');
    const className = classNames('sp-slide', {
      selected: active,
    });

    return (
      <div
        className={className}
        data-index={index}
      >
        <img
          className="sp-image"
          src={`${THUMBS_URL}unsafe/460x460/${src}`}
          alt={alt}
          title={title}
          itemProp="image"
        />
      </div>
    );
  }
}

export default BigPreview;
