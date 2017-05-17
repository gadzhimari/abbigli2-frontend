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
import { fetchData as fetchDataBlogs, setData as setDataBlogs } from 'ducks/PostsSpecific';
import { Link } from 'react-router';

import { registerPopup } from 'ducks/Popup';

import { __t } from '../../i18n/translator';


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
      new: __t('New'),
      popular: __t('Popular'),
      near: __t('Beside'),
      mood: __t('Create a mood'),
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
            {
              this.props.route.slug !== 'new'
              &&
              <CardsSortItem to="/new-products">
                {__t('New')}
              </CardsSortItem>
            }
            {
              this.props.route.slug !== 'popular'
              &&
              <CardsSortItem to="/popular-products">
                {__t('Popular')}
              </CardsSortItem>
            }
            {
              this.props.route.slug !== 'near'
              &&
              <CardsSortItem to="/nearest-products">
                {__t('Beside')}
              </CardsSortItem>}
            {
              this.props.route.slug !== 'mood'
              &&
              <CardsSortItem to="/set-the-mood">
                {__t('Create a mood')}
              </CardsSortItem>
            }
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

        {
          (!isFetchingPosts && this.props.route.slug === 'near')
          &&
          itemsPosts.length === 0
          &&
          <div className="pages__error-text">
            {__t('Nobody is near with You. You can be first')}
          </div>
        }



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
