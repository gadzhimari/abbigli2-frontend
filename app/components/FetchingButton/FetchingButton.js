import React, { PropTypes } from 'react';

import './FetchingButton.styl';

const FetchingButton = props => {
  const { isFetching, onClick, children, className } = props;
  const hundleClick = () => {
    if (isFetching) return;
    onClick();
  };
  const childrenClass = isFetching
    ? 'loader__children loader__children--hide'
    : 'loader__children';
  const loaderClass = isFetching
    ? 'loader__wrapper'
    : 'loader__wrapper loader__wrapper--hide';

  return (
    <button
      className={className}
      type="button"
      onClick={hundleClick}
    >
      <div className={loaderClass}>
        <div className='loader01' />
      </div>
      <div className={childrenClass}>
        {children}
      </div>
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
