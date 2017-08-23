import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import { __t } from '../../../i18n/translator';


const SortItem = ({ onClick, data }) => (
  <div
    className="select__item"
    onMouseDown={onClick}
    onTouchStart={onClick}
    data-value={data}
    data-field="sort"
  >
    {__t(data)}
  </div>
);

SortItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

export default pure(SortItem);
