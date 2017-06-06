import React from 'react';
import { Link } from 'react-router';

const className = 'cards-sort__item';
const activeClass = `${className} cards-sort__item--active`;

const CardSortItem = ({
  to,
  children,
  isActive,
}) => (
    <Link
      to={to}
      className={isActive ? activeClass : className}
    >
      {children}
    </Link>
  );

export default CardSortItem;
