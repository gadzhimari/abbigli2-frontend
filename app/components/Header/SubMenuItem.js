import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { DOMAIN_URL } from 'config';

const SubMenuItem = ({ item, hideCategory }) => (
  <Link
    to={`/${item.view_on_site_url.replace(DOMAIN_URL, '')}`}
    onClick={hideCategory}
    className="header-submenu__item"
    data-cat_id={item.id}
  >
    {item.title}
  </Link>
);

SubMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  hideCategory: PropTypes.func.isRequired,
};

export default SubMenuItem;
