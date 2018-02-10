import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import { Blog } from '../../components/Cards';

import postLoader from '../../HOC/postLoader';

import { fetchPost, fetchNew, resetPost, fetchPopular, fetchRelative, toggleFavorite } from '../../ducks/PostPage/actions';
import { sendComment, fetchComments } from '../../ducks/Comments/actions';
import { fetchData as fetchDataAuthors } from '../../ducks/ProfilePosts';

import { __t } from '../../i18n/translator';
import { POST_DATE_FORMAT } from '../../lib/date/formats';

import './BlogPage.less';

class BlogPage extends Component {
  static fetchSubData = (dispatch, data, params) => Promise.all([
    dispatch(fetchNew({
      type: 4,
    })),
    dispatch(fetchComments(params.slug)),
    dispatch(fetchDataAuthors({
      type: 'posts',
      excludeId: data.id,
      profileId: data.user.id,
    })),
    dispatch(fetchPopular(4)),
    dispatch(fetchRelative(params.slug)),
  ])

  static onUnmount = (dispatch) => {
    dispatch(resetPost());
  }

  componentDidMount() {
    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('blog');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('blog');
  }

  handleFavorite = () => this.props.dispatch(toggleFavorite(this.props.data.slug))

  sendComment = (comment) => {
    const { dispatch, params } = this.props;

    dispatch(sendComment({
      comment,
      slug: params.slug,
    }));
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
      isFetchingBlogs,
      itemsBlogs,
      isFetchingAuthors,
      itemsAuthors,
      data,
      isDefined,
      isAuthenticated,
      dispatch,
      isFetchingComments,
      popularPosts,
      author,
      relativePosts,
      me,
    } = this.props;

    const crumbs = [{
      title: __t('Blogs'),
      url: '/blogs',
    },
    {
      title: data.user.profile_name || `User ID: ${data.user.id}`,
      url: `/profile/${data.user.id}`,
    },
    {
      title: data.title,
      url: `/blog/${data.slug}`,
    }];

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

        <div className="main article">
          <BreadCrumbs crumbs={crumbs} />

          <div className="content">
            <div className="article__wrapper">
              <h1 className="section-title">
                {userIsOwner &&
                  <Link to={createPostEditLink({ id: data.user.id, slug: data.slug })}>
                    <svg className="icon icon-blog" viewBox="0 0 51 52.7">
                      <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z " />
                    </svg>
                  </Link>
                }

                {data.title}
              </h1>

              <div className="article__date">
                {
                  toLocaleDateString(data.created,
                    POST_DATE_FORMAT)
                }
              </div>

              {this.renderSlider()}

              <div>{processBlogContent(data.content)}</div>

              {userIsOwner &&
                <Link to={createPostEditLink({ id: data.user.id, slug: data.slug })} className="edit-btn">
                  <svg className="icon icon-edit" viewBox="0 0 18 18">
                    <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z" />
                  </svg>
                  {__t('Edit')}
                </Link>
              }
            </div>
            <FavoriteAdd
              toggleFavorite={this.handleFavorite}
              isFavorited={data.favorite}
            />

            <Comments
              onSend={this.sendComment}
              canComment={isAuthenticated}
              dispatch={dispatch}
              comments={commentsList}
            />
          </div>
          <Sidebar
            data={data}
            newPosts={itemsBlogs}
            popularPosts={popularPosts}
            toggleFavorite={this.handleFavorite}
            isFavorited={data.favorite}
            seeAllUrl="/blogs"
            newSectionTitle={__t('New in blogs')}
            popularSectionTitle={__t('Popular in blogs')}
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


BlogPage.propTypes = {
  router: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isDefined: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetchingBlogs: PropTypes.bool,
  itemsBlogs: PropTypes.array,
  isFetchingAuthors: PropTypes.bool,
  itemsAuthors: PropTypes.array,
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
  itemsAuthors: state.ProfilePosts.items,
  isFetchingAuthors: state.ProfilePosts.isFetching,
  itemsComments: state.Comments.comments,
  isFetchingComments: state.Comments.commentFetchingState,
  isAuthenticated: state.Auth.isAuthenticated,
  me: state.Auth.me,
});

export default connect(mapStateToProps)(postLoader(BlogPage));
