import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  BreadCrumbs,
  Filters,
  ListWithNew,
  PageSwitcher,
} from 'components';
import { Product } from 'components/Cards';
import { fetchData } from 'ducks/PostsSpecific';

import preloader from './preloader';

const newData = [{
  id: 0,
  type: 4,
  title: 'Blog title',
  author: {
    name: 'Mike',
  },
},
{
  id: 1,
  type: 3,
  title: 'Event title',
  date: '22.07.2017',
  author: {
    name: 'Mike',
  },
}];

class SpecificPostsPage extends PureComponent {
  render() {
    const { page, priceTemplate, items } = this.props;
    const crumbs = [page];

    return (
      <main className="main">
        <BreadCrumbs
          crumbs={crumbs}
        />
        <h1 className="section-title">
          {page.title}
        </h1>
        <ListWithNew
          ItemComponent={Product}
          items={items}
          newItems={newData}
          count={8}
          itemProps={{ priceTemplate }}
        />
        <PageSwitcher
          count={25}
          active={5}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ PostsSpecific, Settings, Auth }) => ({
  next: PostsSpecific.next,
  items: PostsSpecific.items,
  isFetching: PostsSpecific.isFetching,
  isAuthenticated: Auth.isAuthenticated,
  priceTemplate: Settings.data.CURRENCY,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (specific, options) => dispatch(fetchData(specific, options)),
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), preloader);

export default enhance(SpecificPostsPage);
