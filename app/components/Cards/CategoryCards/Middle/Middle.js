import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import { Link } from 'react-router';

import { THUMBS_URL } from 'config';

import './Middle.less';

const Middle = ({ item, url }) => {
  return (
    <Link
      className="category-button category-button--imaged"
      to={`${url}/${item.slug}`}
      alt={item.title}
      title={item.title}
    >
      <div className="category-button__image-wrapper">
        <img
          src={`${THUMBS_URL}unsafe/289x238/${item.images[0]}`}
          alt={item.title}
          className="category-button__image"
        />
      </div>
      <div className="category-button__title">
        {item.title}
      </div>
    </Link>
  );
};

Middle.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    images: PropTypes.array,
    id: PropTypes.number,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default pure(Middle);
