import React, { PropTypes } from 'react';

import './FetchingButton.styl';

const FetchingButton = props => {
  const { isFetching, onClick, children, className } = props;
  const hundleClick = () => {
    if (isFetching) return;
    onClick();
  };

  return (
    <button
      className={className}
      type="button"
      onClick={hundleClick}
    >
      {
        isFetching
          ? <div className="loader01"></div>
          : children
      }
    </button>
  );
};

FetchingButton.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default FetchingButton;
