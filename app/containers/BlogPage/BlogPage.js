import { connect } from 'react-redux';
import { React, Component } from '../../components-lib/__base';

import Link from '../../components/Link/Link';
import { processBlogContent } from '../../lib/process-html';
import createPostEditLink from '../../lib/links/edit-post-link';
import toLocaleDateString from '../../lib/date/toLocaleDateString';

import {
  Gallery,
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  Sidebar,
  FavoriteAdd,
  RelativePosts,
  ListWithNew,
} from '../../components';

import { Comments } from '../../components/Comments';
import { Blog } from '../../components-lib/Cards';
import { Icon } from '../../components-lib';

import postLoader from '../../HOC/postLoader';

import {
  fetchPost,
  fetchNew,
  resetPost,
  fetchPopular,
  fetchRelative,
  setFollow,
  fetchUsersPosts,
  addBookmark,
  deleteBookmark,
  toggleFavorite
} from '../../ducks/PostPage/actions';
import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { openPopup } from '../../ducks/Popup/actions';

import { __t } from '../../i18n/translator';
import { POST_DATE_FORMAT } from '../../lib/date/formats';
import { BLOG_TYPE } from '../../lib/constants/posts-types';

import './BlogPage.less';

class BlogPage extends Component {
  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('blog');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('blog');
  }

  sendComment = (comment) => {
    const { data: { slug }, sendComment } = this.props;
    sendComment({ text: comment, slug });
  }

  renderSlider = () => {
    const {
      images,
      title,
      tags,
    } = this.props.data;

    const defaultImages = images &&
      images
        .filter(item => item.type !== 'redactor')
        .map(image => ({
          original: image.file,
          thumbnail: image.file,
          originalAlt: tags.join(' '),
          originalTitle: title,
        }));

    return defaultImages && <Gallery images={defaultImages} />;
  }

  render() {
    const commentsList = this.props.itemsComments;

    const {
      itemsBlogs,
      data,
      isAuthenticated,
      popularPosts,
      author,
      relativePosts,
      me,
      followUser,
      openPopup,
      toggleFavorite,
      usersPosts
    } = this.props;

    const crumbs = [{
      title: __t('Blogs'),
      url: '/blogs',
    },
    {
      title: author.profile_name || `User ID: ${author.id}`,
      url: `/profile/${author.id}`,
    },
    {
      title: data.title,
      url: `/blog/${data.slug}`,
    }];

    const userIsOwner = author.id === me.id;

    const favoriteAddProps = {
      toggleFavorite,
      isFavorite: data.is_favorite,
      slug: data.slug
    };

    const editingLink = createPostEditLink(data, BLOG_TYPE);
    const blogIcon = <Icon glyph="blog" color="green" />;

    return (
      <main>
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              canSubscribe={!userIsOwner}
              followUser={followUser}
            />
            <OtherArticles
              articles={usersPosts}
              data={author}
              type={BLOG_TYPE}
            />
          </div>
        </div>

        <div className="main article">
          <BreadCrumbs crumbs={crumbs} />

          <div className="content">
            <div className="article__wrapper">
              <h1 className="section-title">
                {userIsOwner ?
                  <Link to={editingLink}>
                    {blogIcon}
                  </Link> :
                  blogIcon
                }

                {data.title}
              </h1>

              <div className="article__date">
                {
                  toLocaleDateString(data.created, POST_DATE_FORMAT)
                }
              </div>

              {this.renderSlider()}

              <div>{processBlogContent(data.text)}</div>

              {userIsOwner &&
                <Link to={editingLink} className="edit-btn">
                  <svg className="icon icon-edit" viewBox="0 0 18 18">
                    <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z" />
                  </svg>

                  {__t('Edit')}
                </Link>
                }
            </div>

            <FavoriteAdd {...favoriteAddProps} />

            <Comments
              onSend={this.sendComment}
              canComment={isAuthenticated}
              comments={commentsList}
              openPopup={openPopup}
            />
          </div>

          <Sidebar
            data={data}
            newPosts={itemsBlogs}
            popularPosts={popularPosts}
            seeAllUrl="/blogs"
            newSectionTitle={__t('New in blogs')}
            popularSectionTitle={__t('Popular in blogs')}
            type={BLOG_TYPE}

            {...favoriteAddProps}
          />

          {relativePosts.length > 0 &&
            <RelativePosts
              items={relativePosts}
              Component={Blog}
              slug={data.slug}
              type={BLOG_TYPE}
            />
          }

          <div className="section">
            <ListWithNew
              showOnlyNew
              itemsType={BLOG_TYPE}
            />
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: state.PostPage.post,
  author: state.PostPage.author,
  isFetching: state.PostPage.isFetchingPost,
  isFetchingBookmarks: state.PostPage.isFetchingBookmarks,
  isDefined: state.PostPage.isDefined,
  itemsBlogs: state.PostPage.newPosts,
  popularPosts: state.PostPage.popularPosts,
  relativePosts: state.PostPage.relativePosts,
  isFetchingBlogs: state.PostPage.isFetchingNew,
  isFetchingRelative: state.PostPage.isFetchingRelative,
  isFetchingAuthors: state.ProfilePosts.isFetching,
  itemsComments: state.Comments.comments,
  isFetchingComments: state.Comments.commentFetchingState,
  isAuthenticated: state.Auth.isAuthenticated,
  usersPosts: state.PostPage.usersPosts,
  me: state.Auth.me,
});

const mapDispatch = dispatch => ({
  fetchPost: (...args) => dispatch(fetchPost(BLOG_TYPE, ...args)),
  fetchSubData: (data, params) => {
    dispatch(fetchNew(BLOG_TYPE));
    dispatch(fetchComments(BLOG_TYPE, params.slug));
    dispatch(fetchUsersPosts(BLOG_TYPE, data.author.id, data.id));
    dispatch(fetchPopular(BLOG_TYPE));
    dispatch(fetchRelative(BLOG_TYPE, params.slug));
  },
  onUnmount: () => dispatch(resetPost()),
  followUser: id => dispatch(setFollow(id)),
  sendComment: data => dispatch(sendComment(BLOG_TYPE, data)),
  openPopup: (...args) => dispatch(openPopup(...args)),
  addBookmark: id => dispatch(addBookmark(BLOG_TYPE, id)),
  deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),

  toggleFavorite: slug => dispatch(toggleFavorite(BLOG_TYPE, slug))
});

export default connect(mapStateToProps, mapDispatch)(postLoader(BlogPage));
