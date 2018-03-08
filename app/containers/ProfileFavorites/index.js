import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';

import {
  CardsWrap,
  CardProduct
} from '../../components';
import TogglePrivacy from '../../components/TogglePrivacy';
import { Spin } from '../../components-lib';

import * as actions from '../../ducks/ProfilePosts/actions';

import redirectHOC from '../../HOC/redirectHOC';

import { API_URL } from '../../config';
import { __t } from './../../i18n/translator';

import './index.styl';

class ProfileFavorites extends Component {
  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params !== this.props.params) {
      this.fetchPosts();
    }
  }

  page = 0;

  fetchPosts = () => {
    const { isMe, params, isFetchingMore, loadPosts } = this.props;

    if (isFetchingMore) return;

    const options = {
      isMe,
      profileId: params.profile,
      type: 'favorites',
      page: this.page += 1,
    };

    loadPosts(options);
  }

  render() {
    const {
      isFetchingPosts,
      isFetchingMore,
      itemsPosts,
      dispatch,
      isMe,
      user,
      isAuth,
    } = this.props;

    const infiniteScrollLoader = (
      <div className="spin-wrapper">
        <Spin loading={isFetchingMore} />
      </div>);

    const contentTemplate = () => (<div>
      <TogglePrivacy
        isVisible={isMe}
        onToggle={this.toggelePrivacy}
        status={this.props.user.is_favorite_visible}
      />
      {
        (!user.is_favorite_visible && !isMe)
        &&
        (<div className="profile_content__error">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="1.195 1 23 18">
<path d="M23.96,9.122c-1.172-2.021-2.908-3.673-5.03-4.791l2.792-2.753c0.134-0.132,0.134-0.347,0-0.479
	c-0.134-0.132-0.351-0.132-0.485,0L10.902,11.29c-0.276-0.373-0.426-0.82-0.426-1.29c0-1.207,0.995-2.188,2.219-2.188
	c0.216,0,0.429,0.03,0.634,0.09c0.182,0.053,0.373-0.049,0.427-0.228c0.054-0.179-0.05-0.367-0.23-0.42
	c-0.269-0.079-0.548-0.119-0.83-0.119C11.094,7.135,9.79,8.42,9.79,10c0,0.65,0.22,1.268,0.623,1.772L9.341,12.83
	c-0.685-0.789-1.06-1.784-1.06-2.83c0-2.401,1.98-4.354,4.415-4.354c0.719,0,1.403,0.165,2.036,0.49
	c0.168,0.086,0.376,0.022,0.463-0.144c0.088-0.166,0.022-0.37-0.146-0.457c-0.722-0.37-1.535-0.566-2.354-0.566
	c-2.813,0-5.101,2.256-5.101,5.03c0,1.226,0.446,2.392,1.26,3.309L6.97,15.167c-2.093-1.059-3.802-2.657-4.943-4.626
	c-0.194-0.334-0.194-0.749,0-1.083c2.138-3.687,6.226-5.978,10.669-5.978c1.342,0,2.66,0.205,3.918,0.61
	c0.181,0.058,0.374-0.039,0.433-0.217c0.06-0.178-0.039-0.369-0.22-0.427c-1.326-0.427-2.717-0.643-4.131-0.643
	c-4.689,0-9.005,2.421-11.265,6.318c-0.314,0.541-0.313,1.214,0,1.755c1.172,2.021,2.908,3.673,5.03,4.791l-2.792,2.754
	c-0.134,0.132-0.134,0.346,0,0.479C3.736,18.966,3.823,19,3.911,19s0.175-0.033,0.243-0.099L14.488,8.71
	c0.276,0.372,0.426,0.82,0.426,1.289c0,1.207-0.995,2.188-2.219,2.188c-0.216,0-0.43-0.031-0.635-0.091
	c-0.182-0.054-0.373,0.048-0.427,0.228c-0.054,0.179,0.049,0.367,0.231,0.421c0.269,0.079,0.548,0.119,0.831,0.119
	c1.602,0,2.905-1.285,2.905-2.865c0-0.65-0.22-1.269-0.623-1.772L16.05,7.17C16.735,7.958,17.11,8.954,17.11,10
	c0,2.4-1.98,4.353-4.415,4.353c-0.718,0-1.403-0.165-2.036-0.489c-0.168-0.087-0.375-0.022-0.463,0.144s-0.022,0.37,0.146,0.456
	c0.721,0.371,1.535,0.566,2.353,0.566c2.813,0,5.102-2.257,5.102-5.03c0-1.227-0.446-2.393-1.26-3.31l1.884-1.858
	c2.093,1.058,3.802,2.657,4.943,4.625c0.193,0.334,0.194,0.75,0,1.083c-2.137,3.688-6.226,5.979-10.669,5.979
	c-1.443,0-2.854-0.237-4.196-0.703c-0.179-0.063-0.375,0.03-0.438,0.207c-0.063,0.176,0.031,0.369,0.209,0.432
	c1.415,0.491,2.904,0.74,4.424,0.74c4.689,0,9.006-2.421,11.266-6.318C24.273,10.336,24.273,9.664,23.96,9.122z"/>
</svg>
        </div>)
      }
      <div className="cards-wrap favorites legacy">
        {
          ((isMe && itemsPosts.length)
            ||
            (!isMe && user.is_favorite_visible))
          &&
          <CardsWrap legacy>
            <InfiniteScroll
              pageStart={1}
              loadMore={this.fetchPosts}
              loader={infiniteScrollLoader}
              hasMore={this.props.next != null}
            >
              {
                itemsPosts.map(item => (
                  <CardProduct
                    data={item}
                    key={`${item.slug}--favorites`}
                    deleteFromFavorites={() => {}}
                    legacy
                    isAuthenticated={isAuth}
                    dispatch={dispatch}
                    priceTemplate={this.props.priceTemplate}
                  />
                ))
              }
            </InfiniteScroll>
          </CardsWrap>
        }
        {
          (user.is_favorite_visible && isMe && !itemsPosts.length)
          &&
          __t('Favorites.propfile')
        }
        {
          (user.is_favorite_visible && !isMe && !itemsPosts.length)
          &&
          __t('Nothing here yet')
        }
      </div>
    </div>);

    return (
      <div className="profile_content">
        {
          isFetchingPosts
          ? (<div className="spin-wrapper">
            <Spin visible={isFetchingPosts} />
          </div>)
            : contentTemplate()
        }
      </div>);
  }
}


ProfileFavorites.propTypes = {
  itemsPosts: PropTypes.array.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  isFetchingMore: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  isMe: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const posts = state.ProfilePosts;

  return {
    itemsPosts: posts.items,
    next: posts.next,
    isFetchingPosts: posts.isFetching,
    isFetchingMore: state.ProfilePosts.isFetchingMore,
    me: state.Auth.me,
    user: state.Profile.data,
    isMe: state.Profile.isMe,
    isAuth: state.Auth.isAuthenticated,
    priceTemplate: state.Settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps, actions)(
  withRouter(redirectHOC('is_favorite_visible')(ProfileFavorites))
);
