import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { NewPost, NoMatch } from '../../components';
import { Product, Event, Blog } from '../../components/Cards';
import getRandomInt from '../../lib/math/getRandomInt';

const cardsByType = {
  1: Product,
  4: Blog,
  3: Event,
};

const newItemsByType = {
  1: ['blogs', 'events'],
  4: ['posts', 'events'],
  3: ['posts', 'blogs'],
};

const getNewItems = (type, props) => {
  const types = newItemsByType[type];

  return types.map(item => props[item][getRandomInt(0, props[item].length - 1)]);
};

class ListWithNew extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemProps: PropTypes.shape(),
    itemsType: PropTypes.number,
    count: PropTypes.number.isRequired,
    ItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.any])
      .isRequired,
    query: PropTypes.string,
    newPosts: PropTypes.shape({
      posts: PropTypes.array,
      events: PropTypes.array,
      blogs: PropTypes.array,
    }).isRequired,
  };

  static defaultProps = {
    itemProps: {},
    itemsType: 1,
  };

  renderNoMatchPage() {
    const {
      itemsType,
      newPosts,
      query,
    } = this.props;
    const newItems = getNewItems(itemsType, newPosts);

    return (
      <div>
        <div className="cards-wrap">
          <NoMatch query={query} />
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

  renderCards() {
    const {
      items,
      itemProps,
      itemsType,
      newPosts,
      count,
      ItemComponent,
    } = this.props;
    const newItems = getNewItems(itemsType, newPosts);

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
  }

  render() {
    const { items } = this.props;

    return (
      <div style={{ marginBottom: '30px' }}>
        { items.length === 0 ? this.renderNoMatchPage() : this.renderCards() }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  newPosts: {
    posts: store.NewIn.posts,
    events: store.NewIn.events,
    blogs: store.NewIn.blogs,
  },
});

export default connect(mapStateToProps)(ListWithNew);
