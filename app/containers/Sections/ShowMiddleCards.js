import React from 'react';
import Type from 'prop-types';

import { pure } from 'recompose';

import Middle from '../../components/Cards/CategoryCards/Middle';

const ShowMiddleCards = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="category-buttons">
      {items.map(item => <Middle
        key={item.id}
        item={item}
      />)
      }
    </div>
  );
};

ShowMiddleCards.propTypes = {
  items: Type.arrayOf(Type.object),
};

ShowMiddleCards.defaultProps = {
  items: [],
};

export default pure(ShowMiddleCards);
