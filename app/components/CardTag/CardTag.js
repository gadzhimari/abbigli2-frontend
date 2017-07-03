import React from 'react';

import {
  Link
} from 'components';

import { DOMAIN_URL } from 'config';

import './CardTag.styl';

function CardTag(props) {

  let { title, preview } = props.data;

  let currentSlug = props.currentSlug;

  const sizes = ['242x190'];

  return (
    <Link
      className="card tag-card legacy"
      to={`/sections/${currentSlug}/${title}/new`}
    >
      <div className="tag-card__img">
        <img
          className="card-img"
          src={`${DOMAIN_URL}thumbs/unsafe/${sizes[0]}/${preview}`}
          alt={title}
        />
      </div>
      <div className="card-name-wrap">
        <div className="card-name">#{title}</div>
      </div>
    </Link>
  );
}

export default CardTag;