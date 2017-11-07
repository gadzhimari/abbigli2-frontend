import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { pure } from 'recompose';

import { NewPost } from 'components';
import { Product, Event, Blog } from 'components/Cards';

import { __t } from './../../i18n/translator';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const cardsByType = {
  1: Product,
  4: Blog,
  3: Event,
};

const newItemsByType = {
  1: ['blogs', 'events'],
  3: ['posts', 'events'],
  4: ['posts', 'blogs'],
};

const getNewItems = (type, props) => {
  const types = newItemsByType[type];

  return types.map(item => props[item][getRandomInt(0, props[item].length - 1)]);
};

const ListWithNew = ({
  items,
  itemProps,
  count,
  ItemComponent,
  itemsType,
  newPosts,
}) => {
  const newItems = getNewItems(itemsType, newPosts);

  if (items.length === 0) {
    return (
      <div>
        <div className="cards-wrap">
          {__t('Nothing here yet')}
        </div>
        <div className="cards-wrap">
          {
            newItems.map((item) => {
              if (!item) {
                return null;
              }

              return (<NewPost
                data={item}
                key={item.id}
              />);
            })
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
          newItems.map((item) => {
            if (!item) {
              return null;
            }

            return (<NewPost
              data={item}
              key={item.id}
            />);
          })
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
  itemsType: 1,
};

ListWithNew.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemProps: PropTypes.shape(),
  itemsType: PropTypes.number,
  count: PropTypes.number.isRequired,
  ItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.any])
    .isRequired,
  newPosts: PropTypes.shape({
    posts: PropTypes.array,
    events: PropTypes.array,
    blogs: PropTypes.array,
  }).isRequired,
};

const mapStore = store => ({
  newPosts: {
    posts: store.NewIn.posts,
    events: store.NewIn.events,
    blogs: store.NewIn.blogs,
  },
});

export default connect(mapStore)(pure(ListWithNew));
