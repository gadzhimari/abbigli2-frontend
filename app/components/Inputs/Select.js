import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  options,
}) => (
  <select>
    {
      options.map((item, key) => (
        <option key={key}>
          {item}
        </option>
      ))
    }
  </select>
);

export default Select;
