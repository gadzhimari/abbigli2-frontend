import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import { Link } from 'react-router';

import { THUMBS_URL } from 'config';

import './Big.less';

const Big = ({ item, url }) => {
  return (
    <div className="promo-tag">
      <div className="promo-tag__img-wrap">
        <img
          className="promo-tag__img"
          src={`${THUMBS_URL}/unsafe/289x238/${item.images[0]}`}
          alt={item.title}
        />
      </div>
      <Link
        className="promo-tag__link promo-tag__link--header"
        to={`${url}/${item.slug}`}
      >
        {item.title}
      </Link>
      <div className="promo-tag__links">
        {
          item.children.slice(0, 4)
            .map(child => <Link
              className="promo-tag__link"
              key={child.id}
              to={`${url}/${item.slug}/${child.slug}`}
            >
              {child.title}
            </Link>)
        }
      </div>
      <Link
        className="promo-tag__link promo-tag__link--all"
        to={`${url}/${item.slug}`}
      >
        {'Show all >'}
      </Link>
    </div>
  );
};

Big.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    preview: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  url: PropTypes.string.isRequired,
};

export default pure(Big);
