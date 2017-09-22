import React, { PropTypes } from 'react';

import { DOMAIN_URL } from 'config';

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
    >
      <img
        className="sp-image"
        src={`${DOMAIN_URL}thumbs/unsafe/460x460/${src}`}
        alt={'Handmade'}
        title={'Abbigli'}
        data-pin-media={src}
      />
    </div>
  );
};

BigPreview.propTypes = {
  src: PropTypes.string,
  active: PropTypes.bool,
  index: PropTypes.number,
};

export default BigPreview;
