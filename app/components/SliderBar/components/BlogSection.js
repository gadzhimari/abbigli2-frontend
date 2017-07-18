import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { DOMAIN_URL } from 'config';

const BlogSection = ({ item }) => (
  <Link
    className="slider-category__item"
    to={`/blogs?section=${item.slug}`}
  >
    <img
      src={`${DOMAIN_URL}thumbs/unsafe/120x103/${item.images[0]}`}
      alt={item.title}
    />
    <div className="slider-category__name">{item.title}</div>
  </Link>
);

BlogSection.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BlogSection;
