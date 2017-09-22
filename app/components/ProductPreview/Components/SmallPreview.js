import React, { PropTypes } from 'react';

import { DOMAIN_URL } from 'config';

const SmallPreview = (props) => {
  const { src, active, index, slideWidth, onClick } = props;
  const activeClass = active
    ? ' sp-selected-thumbnail'
    : '';

  return (
    <div
      className={`sp-thumbnail-container${activeClass}`}
      style={{
        width: `${slideWidth}px`,
        height: `${slideWidth}px`,
      }}
      data-index={index}
      onClick={onClick}
    >
      <img
        className="sp-thumbnail"
        data-index={index}
        src={`${DOMAIN_URL}thumbs/unsafe/100x100/${src}`}
        style={{ width: '100%' }}
        alt=""
        title="Abbigli"
        data-pin-nopin="true"
      />
    </div>
  );
};

SmallPreview.propTypes = {
  src: PropTypes.string,
  active: PropTypes.bool,
  index: PropTypes.number,
  slideWidth: PropTypes.number,
  onClick: PropTypes.func,
};

export default SmallPreview;
