import React from 'react';
import PropTypes from 'prop-types';

import { pure } from 'recompose';

import Big from 'components/Cards/CategoryCards/Big';

const ShowAllSection = ({ items, url }) => {
  return (
    <div className="cards-wrap cards-wrap_tag">
      {
        items.map(item => <Big
          key={item.id}
          item={item}
          url={url}
        />)
      }
    </div>
  );
};

export default pure(ShowAllSection);
