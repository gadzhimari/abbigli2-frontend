import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { NewPost, NoMatch } from '../../components';
import { Product, Event, Blog } from '../../components-lib/Cards';
import getRandomInt from '../../lib/math/getRandomInt';
import { PRODUCT_TYPE, BLOG_TYPE, EVENT_TYPE } from '../../lib/constants/posts-types';

const cardsByType = {
  [PRODUCT_TYPE]: Product,
  [BLOG_TYPE]: Blog,
  [EVENT_TYPE]: Event
};

const newItemsByType = {
  [PRODUCT_TYPE]: [BLOG_TYPE, EVENT_TYPE],
  [BLOG_TYPE]: [PRODUCT_TYPE, EVENT_TYPE],
  [EVENT_TYPE]: [PRODUCT_TYPE, BLOG_TYPE]
};

const getNewItems = (type, postsMapByType) => {
  const types = newItemsByType[type];

  return types.map((type) => {
    const idx = getRandomInt(0, postsMapByType[type].length - 1);
    const postData = postsMapByType[type][idx];

    // Добавляем тип к данным поста
    // Нужно тк в новом АПИ тип не возвращается.
    return postData && {
      ...postData,
      type
    };
  });
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
    itemsType: PRODUCT_TYPE,
  };

  renderNoMatchPage(newItems) {
    const { query } = this.props;

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

  renderCards(newItems) {
    const {
      items,
      itemProps,
      count,
      ItemComponent,
      type
    } = this.props;

    return (
      <Fragment>
        <div className="cards-wrapper">
          {
            items.slice(0, count).map((item) => {
              const Component = ItemComponent || cardsByType[item.type || type];

              return (<Component
                key={item.id}
                data={item}
                {...itemProps}
              />);
            })
          }
        </div>
        {this.renderNewPosts(newItems)}
        <div className="cards-wrapper">
          {
            items.slice(count).map((item) => {
              const Component = ItemComponent || cardsByType[item.type || type];

              return (<Component
                key={item.id}
                data={item}
                {...itemProps}
              />);
            })
          }
        </div>
      </Fragment>
    );
  }

  renderNewPosts(newItems) {
    return (
      <div className="cards-wrapper">
        {newItems.map((item) => {
          if (!item) return null;

          return <NewPost data={item} key={item.id} />;
        })}
      </div>
    );
  }

  render() {
    const {
      items,
      itemsType,
      newPosts,
      showOnlyNew
    } = this.props;
    const newItems = getNewItems(itemsType, newPosts);

    if (showOnlyNew) {
      return this.renderNewPosts(newItems);
    }

    return (
      <div style={{ marginBottom: '30px' }}>
        { items.length === 0 ? this.renderNoMatchPage(newItems) : this.renderCards(newItems) }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  newPosts: {
    [PRODUCT_TYPE]: store.NewIn.posts,
    [EVENT_TYPE]: store.NewIn.events,
    [BLOG_TYPE]: store.NewIn.blogs,
  },
});

export default connect(mapStateToProps)(ListWithNew);
