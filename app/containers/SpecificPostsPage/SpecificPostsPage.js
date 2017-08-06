import React, { Component, PropTypes } from 'react';
import {
  CardsWrap,
  CardProduct,
  Loading,
  BannerOld,
  CardsSort,
  CardsSortItem,
} from 'components';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchData as fetchDataBlogs } from 'ducks/PostsSpecific';

import { stagedPopup } from 'ducks/Auth/authActions';

import { __t } from '../../i18n/translator';


class SpecificPostsPage extends Component {
  static prerenderData = ({ store }, nextState, replace, callback) => {
    console.log(nextState);

    Promise.all([
      store.dispatch(fetchDataBlogs(nextState.route, {})),
    ]).then(() => callback());
  }

  componentWillMount() {
    this.fetchData(this.props.route);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route !== this.props.route) {
      this.fetchData(nextProps.route);
    }
  }

  fetchData = (route, page) => {
    const { dispatch } = this.props;
    const options = {};

    if (route.filter) {
      options[route.filter] = true;
    }

    if (page) {
      options.page = page;
    }

    dispatch(fetchDataBlogs(route.slug, options));
  }

  showRegister = () => {
    const { dispatch } = this.props;

    dispatch(stagedPopup('register'));
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

    const page_name = page_names[this.props.route.slug] || page_names[this.props.route.filter];

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
              this.props.route.filter !== 'popular'
              &&
              <CardsSortItem to="/popular-products">
                {__t('Popular')}
              </CardsSortItem>
            }
            {
              this.props.route.filter !== 'near'
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
            loadMore={(page) => { this.fetchData(this.props.route, page); }}
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
                  priceTemplate={this.props.priceTemplate}
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
    priceTemplate: state.Settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps)(SpecificPostsPage);
