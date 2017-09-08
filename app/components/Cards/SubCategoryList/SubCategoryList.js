import React from 'react';
import PropTypes from 'prop-types';

import SubCategoryItem from './SubCategoryItem';

const SubCategoryList = ({ items, url }) => (
  <div className="category-buttons">
    {
      items.map(item => <SubCategoryItem
        data={item}
        url={url}
        key={item.id}
      />)
    }
  </div>
);

SubCategoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  url: PropTypes.string.isRequired,
};

export default SubCategoryList;
