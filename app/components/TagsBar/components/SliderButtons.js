import React, { PropTypes } from 'react';

const SliderButtons = (props) => {
  const { shouldRightButtonShow, shouldLeftButtonShow, slideRight, slideLeft } = props;

  return (
    <ul className="flex-direction-nav">
      {
        shouldLeftButtonShow
          ? (
            <li className="flex-nav-prev">
              <a
                className="flex-prev"
                onClick={slideLeft}
              >
                Previous
                  </a>
            </li>
          )
          : null
      }
      {
        shouldRightButtonShow
          ? (
            <li className="flex-nav-next">
              <a
                className="flex-next"
                onClick={slideRight}
              >
                Next
                  </a>
            </li>
          )
          : null
      }
    </ul>
  );
};

SliderButtons.propTypes = {
  shouldRightButtonShow: PropTypes.bool,
  shouldLeftButtonShow: PropTypes.bool,
  slideRight: PropTypes.func,
  slideLeft: PropTypes.func,
};

export default SliderButtons;
