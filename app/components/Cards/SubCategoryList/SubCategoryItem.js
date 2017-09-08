import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';


const SubCategoryItem = ({ data, url }) => (
  <Link
    className="category-button"
    to={`${url}/${data.slug}`}
  >
    {data.title}
  </Link>
);

SubCategoryItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default SubCategoryItem;
