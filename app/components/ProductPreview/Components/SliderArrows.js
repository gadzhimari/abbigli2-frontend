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
        <svg className="icon" >
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#prev"></use>
        </svg>
      </div>
      <div
        className="sp-arrow sp-next-arrow"
        onClick={nextSlide}
      >
        <svg className="icon" >
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#next"></use>
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
