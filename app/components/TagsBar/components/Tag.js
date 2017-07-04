import React from 'react';
import { pure } from 'recompose';

import { Link } from 'components';

const Tag = ({
  tag,
}) => {
  const random = Math.floor(Math.random() * (9 - 1)) + 1;

  return (<Link
    className={`slider-tags__item tag_${random}`}
    key={tag.id}
    to="/"
  >
    #{tag.title}
  </Link>);
};

export default pure(Tag);
