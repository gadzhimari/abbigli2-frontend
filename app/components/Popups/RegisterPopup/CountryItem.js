import React from 'react';

const CountryItem = ({
  data,
  onClick,
}) => {
  const handleClick = () => {
    onClick({
      country: data,
    });
  };

  return (
    <div
      className="country"
      onClick={handleClick}
    >
      <div className="country__name">
        {data.name}
      </div>
      <div className="country__code">
        {data.phone}
      </div>
    </div>
  );
};

export default CountryItem;
