import React, { PropTypes } from 'react';

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
        src={`https://abbigli.com/thumbs/unsafe/100x100/${src}`}
        style={{ width: '100%' }}
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
