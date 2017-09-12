import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import Middle from 'components/Cards/CategoryCards/Middle';

const ShowMiddleCards = ({ items, url }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="category-buttons">
      {
        items.map(item => <Middle
          key={item.id}
          item={item}
          url={url}
        />)
      }
    </div>
  );
};

ShowMiddleCards.defaultProps = {
  items: [],
};

export default pure(ShowMiddleCards);
