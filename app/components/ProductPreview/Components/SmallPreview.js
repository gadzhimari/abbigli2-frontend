import PropTypes from 'prop-types';
import React from 'react';

import { THUMBS_URL } from 'config';

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
        src={`${THUMBS_URL}unsafe/100x100/${src}`}
        style={{ width: '100%' }}
        alt=""
        title=""
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
