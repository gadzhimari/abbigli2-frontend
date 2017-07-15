import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'components';
import { DOMAIN_URL } from 'config';

import './CardTag.less';

const CardTag = ({
  slug,
  data,
}) => (
  <Link
    className="tag-card"
    to={`/sections/${slug}/${data.title}/new`}
  >
    <div className="tag-card__img-wrap">
      <img
        className="tag-card__img"
        src={`${DOMAIN_URL}thumbs/unsafe/251x207/${data.preview}`}
        alt={data.title}
      />
    </div>
    <div className="tag-card__name">#{data.title}</div>
  </Link>
);

CardTag.propTypes = {
  slug: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    preview: PropTypes.string,
  }).isRequired,
};

export default CardTag;
