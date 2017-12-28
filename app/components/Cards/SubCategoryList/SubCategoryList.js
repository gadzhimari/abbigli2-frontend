import React from 'react';
import PropTypes from 'prop-types';

import SubCategoryItem from './SubCategoryItem';

const SubCategoryList = ({ items }) => (
  <div className="category-buttons">
    {
      items.map(item => <SubCategoryItem
        data={item}
        key={item.id}
      />)
    }
  </div>
);

SubCategoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SubCategoryList;
