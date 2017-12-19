import React from 'react';
import PropTypes from 'prop-types';
import PrepareTitle from './PrepareTitle';

const SubMenuDropdownItem = ({ item, onClick }) => (
  <div
    className="header-submenu__dropdown-item hide"
    data-cat_id={item.id}
    onClick={onClick}
  >
    <div className="dropdown-item__name">
      <a alt="">
        {PrepareTitle(item.title)}
      </a>
    </div>
  </div>
);

SubMenuDropdownItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubMenuDropdownItem;