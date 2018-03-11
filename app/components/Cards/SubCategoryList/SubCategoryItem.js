import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../Link/Link';

const SubCategoryItem = ({ data }) => (
  <Link
    className="category-button"
    to={data.view_on_site_url}
  >
    {data.title}
  </Link>
);

SubCategoryItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
};

export default SubCategoryItem;
