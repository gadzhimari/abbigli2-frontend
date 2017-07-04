import React, { PropTypes } from 'react';

import Tag from './Tag';

const TagsList = ({
  tags,
  slidedRight,
}) => {
  const containerStyles = {
    transform: `translateX(-${175 * slidedRight}px)`,
  };

  return (
    <div
      className="slider-tags__container"
      style={containerStyles}
    >
      {
        tags.map(tag => <Tag tag={tag} key={tag.id} />)
      }
    </div>
  );
};

TagsList.propTypes = {
  tags: PropTypes.array,
  previousTags: PropTypes.string,
  link: PropTypes.string,
  link: PropTypes.string,
  onCLick: PropTypes.func,
  slidedRight: PropTypes.number.isRequired,
};

export default TagsList;
