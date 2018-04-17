import { connect } from 'react-redux';
import { React, Component, Type } from '../../components-lib/__base';

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
} from '../../components';

import { Comments } from '../../components/Comments';
import { Blog } from '../../components-lib/Cards';

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
  deleteBookmark
} from '../../ducks/PostPage/actions';
import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { openPopup } from '../../ducks/Popup/actions';

import { __t } from '../../i18n/translator';
import { POST_DATE_FORMAT } from '../../lib/date/formats';
import { BLOG_TYPE } from '../../lib/constants/posts-types';

import './BlogPage.less';

class BlogPage extends Component {
  static propTypes = {
    data: Type.shape().isRequired,
    handleFavorite: Type.func.isRequired,
    itemsBlogs: Type.arrayOf(Type.object),
    itemsAuthors: Type.arrayOf(Type.object)
  };

  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('blog');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('blog');
  }

  sendComment = (comment) => {
    const { data: { slug }, sendComment } = this.props;
    sendComment({ comment, slug });
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
      itemsAuthors,
      data,
      isAuthenticated,
      popularPosts,
      author,
      relativePosts,
      me,
      followUser,
      openPopup,
      isFetchingBookmarks,
      addBookmark,
      deleteBookmark
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
      isFetching: isFetchingBookmarks,
      addBookmark,
      deleteBookmark,
      bookmarkId: data.bookmark_id,
      id: data.id
    };

    return (
      <main>
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

        <div className="main article">
          <BreadCrumbs crumbs={crumbs} />

          <div className="content">
            <div className="article__wrapper">
              <h1 className="section-title">
                {userIsOwner &&
                  <Link to={createPostEditLink({ slug: data.slug, type: BLOG_TYPE })}>
                    <svg className="icon icon-blog" viewBox="0 0 51 52.7">
                      <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z " />
                    </svg>
                  </Link>
                }

                {data.title}
              </h1>

              <div className="article__date">
                {
                  toLocaleDateString(data.created, POST_DATE_FORMAT)
                }
              </div>

              {this.renderSlider()}

              <div>{processBlogContent(data.content)}</div>

              {userIsOwner &&
                <Link to={createPostEditLink({ slug: data.slug, type: BLOG_TYPE })} className="edit-btn">
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

            {...favoriteAddProps}
          />

          {relativePosts.length > 0 &&
            <RelativePosts
              items={relativePosts}
              Component={Blog}
              slug={data.slug}
            />
          }

          {/* <div className="section">
            <div className="cards-wrap">
              {
                newData.map(item => <NewPost
                  data={item}
                  key={item.id}
                />)
              }
            </div>
          </div> */}
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
  itemsAuthors: state.ProfilePosts.items,
  isFetchingAuthors: state.ProfilePosts.isFetching,
  itemsComments: state.Comments.comments,
  isFetchingComments: state.Comments.commentFetchingState,
  isAuthenticated: state.Auth.isAuthenticated,
  me: state.Auth.me,
});

const mapDispatch = dispatch => ({
  fetchPost: (...args) => dispatch(fetchPost(BLOG_TYPE, ...args)),
  fetchSubData: (data, params) => {
    dispatch(fetchNew(BLOG_TYPE));
    dispatch(fetchComments(BLOG_TYPE, params.slug));
    fetchUsersPosts(BLOG_TYPE, data.author.id);
    dispatch(fetchPopular(BLOG_TYPE));
    dispatch(fetchRelative(BLOG_TYPE, params.slug));
  },
  onUnmount: () => dispatch(resetPost()),
  followUser: id => dispatch(setFollow(id)),
  sendComment: data => dispatch(sendComment(data)),
  openPopup: (...args) => dispatch(openPopup(...args)),
  addBookmark: id => dispatch(addBookmark(BLOG_TYPE, id)),
  deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId))
});

export default connect(mapStateToProps, mapDispatch)(postLoader(BlogPage));
