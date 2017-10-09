import PropTypes from 'prop-types';
import React from 'react';

const SliderArrows = props => {
  const { nextSlide, prevSlide } = props;

  return (
    <div>
      <div
        className="sp-arrow sp-previous-arrow"
        onClick={prevSlide}
      >
        <svg className="icon" viewBox="0 0 11.56 18.72">
          <path d="M9.36,0l2.199,2.2L4.415,9.36l7.145,7.16L9.36,18.72L0,9.36L9.36,0z" />
        </svg>
      </div>
      <div
        className="sp-arrow sp-next-arrow"
        onClick={nextSlide}
      >
        <svg className="icon" viewBox="0 0 11.56 18.72">
          <path d="M2.2,0L0,2.2l7.146,7.16L0,16.521l2.2,2.199L11.56,9.36L2.2,0z" />
        </svg>
      </div>
    </div>
  );
};

SliderArrows.propTypes = {
  nextSlide: PropTypes.func,
  prevSlide: PropTypes.func,
};

export default SliderArrows;
