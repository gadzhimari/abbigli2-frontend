import React, { Component, PropTypes } from 'react';
import {
  CardsWrap,
  CardProduct,
  SidebarItem,
  Loading,
  BannerOld,
  CardsSort,
  CardsSortItem
} from 'components'
import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchData, setData } from 'ducks/PostsSpecific';
import { fetchData as fetchDataBlogs, setData as setDataBlogs } from 'ducks/PostsSpecific'
import { Link } from 'react-router';

import { registerPopup } from 'ducks/Popup';


class SpecificPostsPage extends Component {


  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataBlogs(this.props.route.slug));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.route !== this.props.route) {

      const { dispatch } = this.props;
      dispatch(fetchDataBlogs(nextProps.route.slug));
    }
  }

  showRegister = () => {
    const { dispatch } = this.props;

    dispatch(registerPopup());
  }

  render() {
    const {
      isFetchingPosts,
      itemsPosts,
      dispatch,
      isAuthenticated,
    } = this.props;

    const page_names = {
      new: 'New',
      popular: 'Popular',
      near: 'Beside',
      mood: 'Create a mood'
    };

    const page_name = page_names[this.props.route.slug];

    return (
      <div className="container-fluid tag-page">
        <BannerOld
          hideJoin={isAuthenticated}
          join={this.showRegister}
        />



        <CardsWrap legacy={true}>

          <CardsSort>
            {page_name}
            {this.props.route.slug != 'new' && <CardsSortItem to="/new-products">New</CardsSortItem>}
            {this.props.route.slug != 'popular' && <CardsSortItem to="/popular-products">Popular</CardsSortItem>}
            {this.props.route.slug != 'near' && <CardsSortItem to="/nearest-products">Beside</CardsSortItem>}
            {this.props.route.slug != 'mood' && <CardsSortItem to="/set-the-mood">Create a mood</CardsSortItem>}
          </CardsSort>

          <InfiniteScroll
            pageStart={1}
            loadMore={(page) => { dispatch(fetchDataBlogs(this.props.route.slug, page)) }}
            hasMore={this.props.next != null}
          >
            {(!isFetchingPosts || itemsPosts.length > 0)
              &&
            itemsPosts.map((item) => (
              <CardProduct
                data={item}
                key={`${item.slug}--specific`}
                legacy
                dispatch={dispatch}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </InfiniteScroll>
        </CardsWrap>
        <Loading loading={isFetchingPosts} />



      </div>
    );
  }
}


SpecificPostsPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const blogs = (state.PostsSpecific) || { isFetching: true, items: [] };
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    next: blogs.next,
    itemsPosts: blogs.items,
    isFetchingPosts: blogs.isFetching,
    isAuthenticated: auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(SpecificPostsPage);
