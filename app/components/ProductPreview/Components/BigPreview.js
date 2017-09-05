import React, { PropTypes } from 'react';

import { THUMBS_URL } from 'config';

const BigPreview = (props) => {
  const { src, active, index, title, tags } = props;
  const activeClass = active
    ? ' selected'
    : '';
  const alt = tags.length > 0
    ? tags.join(' ')
    : tags;

  return (
    <div
      className={`sp-slide${activeClass}`}
      data-index={index}
      alt={alt}
      title={title}
    >
      <img
        className="sp-image"
        src={`${THUMBS_URL}unsafe/460x460/${src}`}
      ></img>
    </div>
  );
};

BigPreview.propTypes = {
  src: PropTypes.string,
  active: PropTypes.bool,
  index: PropTypes.number,
};

export default BigPreview;
