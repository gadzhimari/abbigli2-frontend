import React from 'react';
import PropTypes from 'prop-types';

import CategoryItem from './CategoryItem';

const MoreList = ({ sections, hideCategory }) => (
  <div>
    {
      sections.map(child => <CategoryItem
        item={child}
        key={child.id}
        categorySlug={child.slug}
        hideCategory={hideCategory}
        className="header-category__column hide"
      />)
    }
  </div>
);

MoreList.propTypes = {
  sections: PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number,
    children: PropTypes.array,
  })).isRequired,
  hideCategory: PropTypes.func.isRequired,
};

export default MoreList;
