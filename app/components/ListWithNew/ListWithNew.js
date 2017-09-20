import React from 'react';
import PropTypes from 'prop-types';

import { NewPost } from 'components';
import { Product, Event, Blog } from 'components/Cards';

import { __t } from './../../i18n/translator';

const cardsByType = {
  1: Product,
  4: Blog,
  3: Event,
};

const ListWithNew = ({
  items,
  newItems,
  itemProps,
  count,
  ItemComponent,
}) => {
  if (items.length === 0) {
    return (
      <div>
        <div className="cards-wrap">
          {__t('Nothing here yet')}
        </div>
        <div className="cards-wrap">
          {
            newItems.map(item => <NewPost
              data={item}
              key={item.id}
            />)
          }
        </div>
      </div>
    );
  }

  return (
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
};

ListWithNew.defaultProps = {
  itemProps: {},
};

ListWithNew.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  newItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemProps: PropTypes.shape(),
  count: PropTypes.number.isRequired,
  ItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.any]).isRequired,
};

export default ListWithNew;
