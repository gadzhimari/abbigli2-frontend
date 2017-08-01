import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const SectionSelect = ({ data, onClick, className }) => (
  <div
    className={`${className}__item`}
    data-field="section"
    data-value={data.slug}
    onMouseDown={onClick}
    onTouchStart={onClick}
  >
    {data.title}
  </div>
);

SectionSelect.propTypes = {
  data: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default pure(SectionSelect);
