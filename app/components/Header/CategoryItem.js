import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

const CategoryItem = ({ item, categorySlug }) => (
  <div className="header-category__column">
    <Link
      className="header-category__title"
      to={`/c/${categorySlug}/${item.slug}`}
    >
      {item.title}
    </Link>
    {
      item.children.length > 0
      &&
      item.children
        .slice(0, 4)
        .map(child => <Link
          className="header-category__name"
          key={child.id}
          to={`/c/${categorySlug}/${item.slug}/${child.slug}`}
        >
          {child.title}
        </Link>)
    }
  </div>
);

CategoryItem.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  categorySlug: PropTypes.string.isRequired,
};

export default CategoryItem;
