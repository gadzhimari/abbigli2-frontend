import React from 'react';
import './index.styl'

function CardSort(props) {
  return (
    <div className="cards-sort">{props.children}</div>
  );
}

export default CardSort;