import React from 'react';
import PropTypes from 'prop-types';

import { NewPost } from 'components';

const ListWithNew = ({
  items,
  newItems,
  ItemComponent,
  itemProps,
  count,
}) => (
    <div>
      <div className="cards-wrap">
        {
          items.slice(0, count).map(item => <ItemComponent
            key={item.id}
            data={item}
            {...itemProps}
          />)
        }
      </div>
      <div className="cards-wrap">
        {
          newItems.map(item => <NewPost
            data={item}
            key={item.id}
          />)
        }
      </div>
      <div className="cards-wrap">
        {
          items.slice(count).map(item => <ItemComponent
            key={item.id}
            data={item}
            {...itemProps}
          />)
        }
      </div>
    </div>
  );

export default ListWithNew;
