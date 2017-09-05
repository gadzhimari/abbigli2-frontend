import React from 'react';
import PropTypes from 'prop-types';

import SubCategoryItem from './SubCategoryItem';

const SubCategoryList = ({ items, category }) => (
  <div className="category-buttons">
    {
      items.map(item => <SubCategoryItem
        data={item}
        category={category}
        key={item.id}
      />)
    }
  </div>
);

SubCategoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export default SubCategoryList;
