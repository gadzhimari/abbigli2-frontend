import React from 'react';

const Color = ({
  color,
  onClick,
  isActive,
}) => (
  <div
    className={`color-choice__color color_${color}${isActive ? ' active' : ''}`}
    data-color={color}
    onClick={onClick}
  />
);

export default Color;
