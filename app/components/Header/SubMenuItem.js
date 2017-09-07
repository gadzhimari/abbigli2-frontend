import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import { DOMAIN_URL } from 'config';

const SubMenuItem = ({ item, showCategory }) => (
  <div
    className="header-submenu__item"
    data-cat_id={item.id}
  >
    <Link
      to={`/${item.view_on_site_url.replace(DOMAIN_URL, '')}`}
    >
      {item.title}
    </Link>
  </div>
);

SubMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  showCategory: PropTypes.func.isRequired,
};

export default SubMenuItem;
