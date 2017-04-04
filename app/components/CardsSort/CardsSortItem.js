import React from 'react';
import { Link } from 'react-router';

function CardSortItem(props) {
  return (
    <Link
      to={props.to}
      className="cards-sort__item"
    >
      {props.children}
    </Link>
  );
}

export default CardSortItem;