import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Link } from 'react-router';

import { THUMBS_URL } from 'config';

const BlogSection = ({ item, baseUrl, isBlog }) => (
  <Link
    className={classNames({
      'slider-category__item': true,
      'slider-category__item_blog': isBlog,
    })}
    to={`${baseUrl ? `${baseUrl}?category=${item.slug}` : `/c/${item.slug}`}`}
  >
    <img
      src={`${THUMBS_URL}unsafe/180x153/${item.images[0]}`}
      alt={item.title}
    />
    <div className="slider-category__name">{item.title}</div>
  </Link>
);

BlogSection.defaultProps = {
  baseUrl: '',
  isBlog: false,
};

BlogSection.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  baseUrl: PropTypes.string,
  isBlog: PropTypes.bool,
};

export default BlogSection;
