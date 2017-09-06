import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';


const SubCategoryItem = ({ data, category }) => (
  <Link
    className="category-button"
    to={`/c/${category}/${data.slug}`}
  >
    {data.title}
  </Link>
);

SubCategoryItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
};

export default SubCategoryItem;
