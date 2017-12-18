import React from 'react';
import PropTypes from 'prop-types';

import CategoryItem from './CategoryItem';

const CategoryList = ({ category, hideCategory }) => (
  <div
    className="header-category"
    data-cat_id={category.id}
  >
    {
      category.children
        .map(child => <CategoryItem
          item={child}
          key={child.id}
          categorySlug={category.slug}
          hideCategory={hideCategory}
          className="header-category__column"
        />)
    }
  </div>
);

CategoryList.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    children: PropTypes.array,
  }).isRequired,
  hideCategory: PropTypes.func.isRequired,
};

export default CategoryList;
