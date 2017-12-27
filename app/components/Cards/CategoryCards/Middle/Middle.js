import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import { Link } from 'react-router';
import Image from '../../../../components/Image';

import './Middle.less';

const Middle = ({ item }) => {
  const imageUrl = item.images && item.images[0];

  return (
    <Link
      className="category-button category-button--imaged"
      to={`${item.view_on_site_url}`}
      alt={item.title}
      title={item.title}
    >
      <div className="category-button__image-wrapper">
        <Image
          className="category-button__image"
          alt={item.title}
          thumbSize="289x238"
          src={imageUrl}
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
};

export default pure(Middle);
