import React from 'react';
import PropTypes from 'prop-types';

import { NewPost, BlogCard } from 'components';
import { Product } from 'components/Cards';

const cardsByType = {
  1: Product,
  4: BlogCard,
};

const ListWithNew = ({
  items,
  newItems,
  itemProps,
  count,
  ItemComponent,
}) => (
    <div>
      <div className="cards-wrap">
        {
          items.slice(0, count).map((item) => {
            const Component = ItemComponent || cardsByType[item.type];

            return (<Component
              key={item.id}
              data={item}
              {...itemProps}
            />);
          })
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
          items.slice(count).map((item) => {
            const Component = ItemComponent || cardsByType[item.type];

            return (<Component
              key={item.id}
              data={item}
              {...itemProps}
            />);
          })
        }
      </div>
    </div>
  );

export default ListWithNew;
