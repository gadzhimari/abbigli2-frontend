import { connect } from 'react-redux';

import pick from 'lodash/pick';

import { React, Component, Type } from '../../components-lib/__base';

import {
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  SimilarPosts,
} from '../../components';

import Content from './Content';
import { Link } from '../../components-lib';
import { Product } from '../../components-lib/Cards';

import postLoader from '../../HOC/postLoader';

import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { sendPostMessage } from '../../ducks/Dialogs/actions';

import {
  fetchPost,
  resetPost,
  fetchSimilar,
  fetchUsersPosts,
  setFollow,
  addBookmark,
  deleteBookmark,
  toggleFavorite
} from '../../ducks/PostPage/actions';
import { openPopup } from '../../ducks/Popup/actions';

import onlyAuthAction from '../../lib/redux/onlyAuthAction';
import { PRODUCT_TYPE } from '../../lib/constants/posts-types';
import createPostEditLink from '../../lib/links/edit-post-link';

import { __t } from './../../i18n/translator';
import './ProductPage.less';

class ProductPage extends Component {
  static propTypes = {
    author: Type.shape({
      profile_name: Type.string,
    }),
  };

  componentDidMount() {
    this.globalWrapper = document.body;
    this.globalWrapper.classList.add('goods-post');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('goods-post');
    this.props.onUnmount();
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
    const {
      itemsAuthors,
      data,
      author,
      similarPosts,
      me,
      followUser,
      toggleFavorite
    } = this.props;
    const crumbs = [];

    if (data.category) {
      crumbs.push({
        title: data.category.title,
        url: data.category.url,
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
      toggleFavorite,
      isFavorite: data.is_favorite,
      slug: data.slug
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
            <OtherArticles
              articles={itemsAuthors}
              data={author}
              type={PRODUCT_TYPE}
            />
          </div>
        </div>
        <div className="main">
          <BreadCrumbs crumbs={crumbs} />

          {userIsOwner &&
            <div className="edit-post__container">
              <Link
                view="default"
                to={editingLink}
                text={__t('Edit')}
              />
            </div>
          }

          <Content
            data={data}
            onWantClick={this.handleWantsClick}
            userIsOwner={userIsOwner}

            {...favoriteAddProps}
          />

          {/* <Comments
            onSend={this.sendComment}
            canComment={isAuthenticated}
            openPopup={openPopup}
            comments={commentsList}
          /> */}

          {similarPosts.length > 0 &&
            <SimilarPosts
              items={similarPosts}
              Component={Product}
            />
          }
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: state.PostPage.post,
  author: state.PostPage.author,
  isFetching: state.PostPage.isFetchingPost,
  isDefined: state.PostPage.isDefined,
  itemsBlogs: state.PostPage.newPosts,
  popularPosts: state.PostPage.popularPosts,
  similarPosts: state.PostPage.similarPosts,
  isFetchingBlogs: state.PostPage.isFetchingNew,
  isFetchingSimilar: state.PostPage.isFetchingSimilar,
  itemsAuthors: state.PostPage.usersPosts,
  itemsComments: state.Comments.comments,
  isFetchingComments: state.Comments.commentFetchingState,
  isAuthenticated: state.Auth.isAuthenticated,
  me: state.Auth.me,
  isFetchingBookmarks: state.PostPage.isFetchingBookmarks,
});

const mapDispatch = dispatch => ({
  fetchPost: (...args) => dispatch(fetchPost(PRODUCT_TYPE, ...args)),
  fetchSubData: (data) => {
    dispatch(fetchComments(PRODUCT_TYPE, data.slug));
    dispatch(fetchUsersPosts(PRODUCT_TYPE, data.author.id, data.id));
    dispatch(fetchSimilar(PRODUCT_TYPE, data.slug));
  },

  followUser: id => dispatch(setFollow(id)),
  openWantsPopup: (...args) => dispatch(onlyAuthAction(openPopup)(...args)),
  sendPostMessage: (...args) => dispatch(sendPostMessage(...args)),
  sendComment: data => dispatch(sendComment(data)),
  openPopup: (...args) => dispatch(openPopup(...args)),

  addBookmark: id => dispatch(addBookmark(PRODUCT_TYPE, id)),
  deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),

  onUnmount: () => dispatch(resetPost()),
  toggleFavorite: slug => dispatch(toggleFavorite(PRODUCT_TYPE, slug))
});

export default connect(mapStateToProps, mapDispatch)(postLoader(ProductPage));
