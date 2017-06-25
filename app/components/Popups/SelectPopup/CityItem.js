import React from 'react';

const CityItem = ({
  data,
  onClick,
}) => {
  const handleClick = () => onClick({
    name: `${data.name}, ${data.country.name}`,
    id: data.id,
  });

  return (
    <div className="city-item" onClick={handleClick}>
      {data.name}
      {', '}
      {data.country.name}
    </div>
  );
};

export default CityItem;
