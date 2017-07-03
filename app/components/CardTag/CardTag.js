import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'components';
import { DOMAIN_URL } from 'config';

import './CardTag.less';

const CardTag = ({
  slug,
  title,
  preview,
}) => (
  <Link
    className="tag-card"
    to={`/sections/${slug}/${title}`}
  >
    <div className="tag-card__img-wrap">
      <img
        className="tag-card__img"
        src={`${DOMAIN_URL}thumbs/unsafe/251x207/${preview}`}
        alt={title}
      />
    </div>
    <div className="tag-card__name">#{title}</div>
  </Link>
);

CardTag.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default CardTag;
