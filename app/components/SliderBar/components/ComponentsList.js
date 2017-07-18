import React, { PropTypes } from 'react';

const ComponentsList = ({
  items,
  slidedRight,
  itemProps,
  ItemComponent,
  itemWidth,
  sliderName,
}) => {
  const containerStyles = {
    transform: `translateX(-${itemWidth * slidedRight}px)`,
    WebkitTransform: `translateX(-${itemWidth * slidedRight}px)`,
  };

  return (
    <div
      className={`${sliderName}__container`}
      style={containerStyles}
    >
      {
        items.map(item => <ItemComponent
          item={item}
          key={item.id}
          {...itemProps}
        />)
      }
    </div>
  );
};

ComponentsList.propTypes = {
  items: PropTypes.array,
  itemProps: PropTypes.object.isRequired,
  onCLick: PropTypes.func,
  slidedRight: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  sliderName: PropTypes.string.isRequired,
};

export default ComponentsList;
