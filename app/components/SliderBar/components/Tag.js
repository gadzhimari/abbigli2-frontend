import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

const Tag = ({
  item,
  onClick,
}) => {
  const random = Math.floor(Math.random() * (9 - 1)) + 1;
  const handleClick = () => onClick(item.title);

  return (<div
    className={`slider-tags__item tag_${random}`}
    key={item.id}
    onClick={handleClick}
  >
    #{item.title}
  </div>);
};

Tag.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default pure(Tag);
