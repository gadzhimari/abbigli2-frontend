import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { THUMBS_URL } from 'config';

const BlogSection = ({ item }) => (
  <Link
    className="slider-category__item"
    to={`/c/${item.slug}`}
  >
    <img
      src={`${THUMBS_URL}unsafe/180x153/${item.images[0]}`}
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
