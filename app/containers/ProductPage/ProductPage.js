import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import pick from 'lodash/pick';

import Link from '../../components/Link/Link';
import {
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  RelativePosts,
} from '../../components';

import Content from './Content';
import { Product } from '../../components-lib/Cards';
import { Comments } from '../../components/Comments';
import createPostEditLink from '../../lib/links/edit-post-link';

import postLoader from '../../HOC/postLoader';

import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { sendPostMessage } from '../../ducks/Dialogs/actions';

import {
  fetchPost,
  resetPost,
  fetchRelative,
  fetchUsersPosts,
  setFollow,
  addBookmark,
  deleteBookmark
} from '../../ducks/PostPage/actions';
import { openPopup } from '../../ducks/Popup/actions';

import onlyAuthAction from '../../lib/redux/onlyAuthAction';
import { PRODUCT_TYPE } from '../../lib/constants/posts-types';

import { __t } from './../../i18n/translator';
import './ProductPage.less';

class ProductPage extends Component {
  componentDidMount() {
    this.globalWrapper = document.body;
    this.globalWrapper.classList.add('goods-post');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('goods-post');
  }

  sendComment = (comment) => {
    const { sendComment, data: { slug } } = this.props;
    sendComment({ comment, slug });
  }

  sendMessage = (message) => {
    const { data, author, sendPostMessage } = this.props;
    const post = pick(data, ['id', 'title', 'sections', 'images', 'price']);

    sendPostMessage(author.id, post, message);
  }

  handleWantsClick = () => {
    this.props.openWantsPopup('sendPost', {
      name: this.props.author.profile_name,
      sendMessage: this.sendMessage,
    });
  }

  render() {
    const commentsList = this.props.itemsComments;

    const {
      itemsAuthors,
      data,
      author,
      relativePosts,
      priceTemplate,
      me,
      isAuthenticated,
      followUser,
      openPopup,
      isFetchingBookmarks,
      addBookmark,
      deleteBookmark
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
      url: `/profile/${author.id}`,
    }, {
      title: data.title,
      url: `/post/${data.slug}`,
    });

    const userIsOwner = author.id === me.id;

    const favoriteAddProps = {
      isFetching: isFetchingBookmarks,
      addBookmark,
      deleteBookmark,
      bookmarkId: data.bookmark_id,
      id: data.id
    };

    const editingLink = createPostEditLink(data, PRODUCT_TYPE);

    return (
      <main className="product">
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              canSubscribe={!userIsOwner}
              followUser={followUser}
            />
            <OtherArticles articles={itemsAuthors} />
          </div>
        </div>
        <div className="main">
          <BreadCrumbs crumbs={crumbs} />

          {userIsOwner &&
            <div className="edit-post__container">
              <Link
                to={editingLink}
                className="default-button edit-post-button"
              >
                {__t('Edit')}
              </Link>
            </div>
          }

          <Content
            data={data}
            onWantClick={this.handleWantsClick}
            userIsOwner={userIsOwner}

            {...favoriteAddProps}
          />

          <Comments
            onSend={this.sendComment}
            canComment={isAuthenticated}
            openPopup={openPopup}
            comments={commentsList}
          />

          <RelativePosts
            items={relativePosts}
            Component={Product}
            slug={data.slug}
            itemProps={{ priceTemplate }}
          />
        </div>
      </main>
    );
  }
}

ProductPage.propTypes = {
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
  itemsComments: state.Comments.comments,
  isFetchingComments: state.Comments.commentFetchingState,
  isAuthenticated: state.Auth.isAuthenticated,
  priceTemplate: state.Settings.data.CURRENCY,
  me: state.Auth.me,
  isFetchingBookmarks: state.PostPage.isFetchingBookmarks,
});

const mapDispatch = dispatch => ({
  fetchPost: (...args) => dispatch(fetchPost(PRODUCT_TYPE, ...args)),
  fetchSubData: (data) => {
    dispatch(fetchComments(PRODUCT_TYPE, data.slug));
    dispatch(fetchUsersPosts(PRODUCT_TYPE, data.author.id));
    dispatch(fetchRelative(PRODUCT_TYPE, data.slug));
  },

  followUser: id => dispatch(setFollow(id)),
  openWantsPopup: (...args) => dispatch(onlyAuthAction(openPopup)(...args)),
  sendPostMessage: (...args) => dispatch(sendPostMessage(...args)),
  sendComment: data => dispatch(sendComment(data)),
  openPopup: (...args) => dispatch(openPopup(...args)),

  addBookmark: id => dispatch(addBookmark(PRODUCT_TYPE, id)),
  deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),

  onUnmount: () => dispatch(resetPost())
});

export default connect(mapStateToProps, mapDispatch)(postLoader(ProductPage));
