import React from 'react';

import {
  Link
} from 'components';

import { DOMAIN_URL } from 'config';

import './Card.styl';

function Card(props) {

  let { title, images, slug } = props.data;

  const sizes = ['227x175','108x71','108x71'];
  //const sizes = ['1x1','1x1','1x1'];

  const image = images[0];

  return (
    <Link className="card" to={"/sections/" + slug}>
      <div className="card-item">
        <img
          className="card-img"
          src={`${DOMAIN_URL}thumbs/unsafe/${sizes[0]}/${image}`}
          alt={title}
        />
      </div>
      <div className="card-name-wrap">
        <div className="card-name">{title[15] ? title.slice(0,14)+'...' : title}</div>
      </div>
    </Link>
  );
}

export default Card;