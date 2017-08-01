import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const TextSelect = ({ data, onClick, className, field }) => (
  <div
    className={`${className}__item`}
    data-field={field}
    data-value={data}
    onMouseDown={onClick}
    onTouchStart={onClick}
  >
    {data}
  </div>
);

TextSelect.propTypes = {
  data: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default pure(TextSelect);
