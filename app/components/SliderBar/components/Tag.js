import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { Link } from 'components';

const Tag = ({
  item,
  previousTags,
  link,
}) => {
  const random = Math.floor(Math.random() * (9 - 1)) + 1;
  const prevTagsLink = previousTags
    ? `${previousTags},${item.title}`
    : `${item.title}`;

  const linkTo = link
    ? `${link}${item.title}/new`
    : `/tags/${prevTagsLink}/new`;

  return (<Link
    className={`slider-tags__item tag_${random}`}
    key={item.id}
    to={linkTo}
  >
    #{item.title}
  </Link>);
};

Tag.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  previousTags: PropTypes.string,
  link: PropTypes.string,
};

export default pure(Tag);
