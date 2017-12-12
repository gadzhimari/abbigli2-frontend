import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { __t } from '../../i18n/translator';

const CategoryItem = ({ item, categorySlug, hideCategory }) => (
  <div className="header-category__column">
    <Link
      className="header-category__title"
      to={`/c/${categorySlug}/${item.slug}`}
      onClick={hideCategory}
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
          onClick={hideCategory}
        >
          {child.title}
        </Link>)
    }
    {
      item.children.length > 4 ?
        <Link
          className="header-category__name"
          to={`/c/${categorySlug}/${item.slug}`}
          onClick={hideCategory}
        >
          {__t('More')}
        </Link> : ''
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
  hideCategory: PropTypes.func.isRequired,
};

export default CategoryItem;
