import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Link from 'react-router/lib/Link';
import {
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  RelativePosts,
} from '../../components';

import Content from './Content';
import { Product } from '../../components/Cards';
import { CommentsField, CommentsList } from '../../components/Comments';

import postLoader from '../../HOC/postLoader';

import { sendComment, fetchData as fetchDataComments } from '../../ducks/Comments';
import { sendPostMessage } from '../../ducks/Dialogs';

import { fetchPost, resetPost, fetchRelative, fetchUsersPosts, toggleFavorite } from '../../ducks/PostPage/actions';

import { openPopup } from '../../ducks/Popup/actions';

import onlyAuthAction from '../../lib/redux/onlyAuthAction';

import { __t } from './../../i18n/translator';
import './ProductPage.less';

class ProductPage extends Component {
  static fetchData = (dispatch, params, token) => dispatch(fetchPost(params.slug, token));

  static fetchSubData = (dispatch, data) => Promise.all([
    dispatch(fetchDataComments(data.slug)),
    dispatch(fetchUsersPosts(1, data.user.id)),
    dispatch(fetchRelative(data.slug)),
  ])
    .catch(console.log)

  static onUnmount = (dispatch) => {
    dispatch(resetPost());
  }

  componentDidMount() {
    this.globalWrapper = document.body;
    this.globalWrapper.classList.add('goods-post');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('goods-post');
  }

  handleFavorite = () => {
    this.props.dispatch(toggleFavorite(this.props.data.slug));
  }

  sendComment = (comment) => {
    const { dispatch, params } = this.props;

    dispatch(sendComment({
      comment,
      slug: params.slug,
    }));
  }

  sendMessage = (message) => {
    const { dispatch, data } = this.props;
    const post = {
      id: data.id,
      title: data.title,
      sections: data.sections,
      images: data.images,
      price: data.price,
    };

    dispatch(sendPostMessage(data.user.id, post, message, this.showOrHideWants));
  }

  openWantsPopup = onlyAuthAction(openPopup)

  handleWantsClick = () => {
    this.openWantsPopup('sendPost', {
      name: this.props.author.profile_name,
      sendMessage: this.sendMessage,
    });
  }

  render() {
    const commentsList = this.props.itemsComments;

    const {
      itemsAuthors,
      data,
      dispatch,
      author,
      relativePosts,
      priceTemplate,
      me,
      isAuthenticated,
    } = this.props;
    const crumbs = [];

    if (data.category) {
      crumbs.push({
        title: data.category.title,
        url: data.category.view_on_site_url,
      });
    }

    crumbs.push({
      title: author.profile_name || `User ID: ${author.id}`,
      url: `/profile/${data.user.id}`,
    }, {
      title: data.title,
      url: `/post/${data.slug}`,
    });

    const userIsOwner = author.id === me.id;

    return (
      <main>
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              dispatch={dispatch}
              canSubscribe={!userIsOwner}
            />
            <OtherArticles articles={itemsAuthors} />
          </div>
        </div>
        <main className="main">
          <BreadCrumbs crumbs={crumbs} />

          {userIsOwner &&
            <Link
              to={`/profile/${author.id}/post/edit/${data.slug}`}
              className="default-button edit-post-button"
            >
              {__t('Edit')}
            </Link>
          }

          <Content
            data={data}
            onWantClick={this.handleWantsClick}
            userIsOwner={userIsOwner}
            onFavoriteClick={this.handleFavorite}
          />

          <div className="section">
            <CommentsField
              onSend={this.sendComment}
              canComment={isAuthenticated}
              dispatch={dispatch}
            />
            <CommentsList comments={commentsList} />
          </div>

          <RelativePosts
            items={relativePosts}
            Component={Product}
            slug={data.slug}
            itemProps={{ priceTemplate }}
          />
        </main>
      </main>
    );
  }
}

ProductPage.propTypes = {
  data: PropTypes.object.isRequired,
  me: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  priceTemplate: PropTypes.string.isRequired,
  author: PropTypes.shape({
    profile_name: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  data: state.PostPage.post,
  author: state.PostPage.author,
  isFetching: state.PostPage.isFetchingPost,
  isDefined: state.PostPage.isDefined,
  itemsBlogs: state.PostPage.newPosts,
  popularPosts: state.PostPage.popularPosts,
  relativePosts: state.PostPage.relativePosts,
  isFetchingBlogs: state.PostPage.isFetchingNew,
  isFetchingRelative: state.PostPage.isFetchingRelative,
  itemsAuthors: state.PostPage.usersPosts,
  itemsComments: state.Comments.items,
  isFetchingComments: state.Comments.isFetching,
  isAuthenticated: state.Auth.isAuthenticated,
  priceTemplate: state.Settings.data.CURRENCY,
  me: state.Auth.me,
});

export default connect(mapStateToProps)(postLoader(ProductPage));
