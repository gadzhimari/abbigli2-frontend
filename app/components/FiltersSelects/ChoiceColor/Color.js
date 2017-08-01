import React from 'react';

const Color = ({
  color,
  onClick,
  isActive,
}) => (
  <div
    className={`color-choice__color color_${color}${isActive ? ' active' : ''}`}
    data-value={color}
    data-field="color"
    onMouseDown={onClick}
    onTouchStart={onClick}
  />
);

export default Color;
