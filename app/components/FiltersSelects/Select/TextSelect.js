import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const TextSelect = ({ data, onClick, className, name }) => (
  <div
    className={`${className}__item`}
    data-field={name}
    data-value={data}
    onMouseDown={onClick}
    onTouchStart={onClick}
  >
    {data}
  </div>
);

TextSelect.propTypes = {
  data: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default pure(TextSelect);
