import React from 'react';
import { pure } from 'recompose';

import { Link } from 'components';

const Tag = ({
  tag,
  previousTags,
  link,
}) => {
  const random = Math.floor(Math.random() * (9 - 1)) + 1;
  const prevTagsLink = previousTags
    ? `${previousTags},${tag.title}`
    : `${tag.title}`;

  const linkTo = link
    ? `${link}${tag.title}`
    : `/tags/${prevTagsLink}/new`;

  return (<Link
    className={`slider-tags__item tag_${random}`}
    key={tag.id}
    to={linkTo}
  >
    #{tag.title}
  </Link>);
};

export default pure(Tag);
