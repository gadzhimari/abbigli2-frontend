import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  Gallery,
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  Sidebar,
  FavoriteAdd,
  NewPost,
  BlogCard,
  RelativePosts,
} from 'components';

import { CommentsField, CommentsList } from 'components/Comments';

import postLoader from 'App/HOC/postLoader';

import { sendComment } from 'ducks/Comments';

import { fetchPost, fetchNew, resetPost, fetchPopular, fetchRelative, toggleFavorite } from 'ducks/PostPage/actions';
import { fetchData as fetchDataComments } from 'ducks/Comments';
import { fetchData as fetchDataAuthors } from 'ducks/ProfilePosts';

import { __t } from '../../i18n/translator';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BlogPage.less';


const newData = [{
  id: 0,
  type: 4,
  title: 'Blog title',
  author: {
    name: 'Mike',
  },
},
{
  id: 1,
  type: 3,
  title: 'Event title',
  date: '22.07.2017',
  author: {
    name: 'Mike',
  },
}];

class BlogPage extends Component {
  static fetchData = (dispatch, params, token) => dispatch(fetchPost(params.slug, 4, token))

  static fetchSubData = (dispatch, data, params) => Promise.all([
    dispatch(fetchNew({
      type: 4,
    })),
    dispatch(fetchDataComments(params.slug)),
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
    this.globalWrapper.classList.add('blog', 'article');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('blog', 'article');
  }

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

    const defaultImages = images
      &&
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

  handleFavorite = () => this.props.dispatch(toggleFavorite(this.props.data.slug))

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

    return (
      <main>
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              dispatch={dispatch}
            />
            <OtherArticles articles={itemsAuthors} />
          </div>
        </div>
        <main className="main">
          <BreadCrumbs crumbs={crumbs} />
          <div className="content">
            <h1 className="section-title">
              <svg className="icon icon-blog" viewBox="0 0 51 52.7">
                <path d="M51,9.4L41.5,0L31,10.4H4.1c-2.3,0-4.1,1.8-4.1,4.1v27.8c0,2.3,1.8,4.1,4.1,4.1h1.4l0.7,6.3 l8.3-6.3H38c2.3,0,4.1-1.8,4.1-4.1V18.1L51,9.4z M16.2,34.4l1-6.3l5.3,5.4L16.2,34.4z M47.2,9.4L24,32.2l-5.6-5.6l23-22.8L47.2,9.4z " />
              </svg>
              {data.title}
            </h1>
            {this.renderSlider()}
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <FavoriteAdd
              toggleFavorite={this.handleFavorite}
              isFavorited={data.favorite}
            />
            <CommentsField
              onSend={this.sendComment}
            />
            <CommentsList
              comments={commentsList}
            />
          </div>
          <Sidebar
            data={data}
            newPosts={itemsBlogs}
            popularPosts={popularPosts}
            toggleFavorite={this.handleFavorite}
            isFavorited={data.favorite}
          />
          {
            relativePosts.length > 0
            &&
            <RelativePosts
              items={relativePosts}
              Component={BlogCard}
              slug={data.slug}
            />
          }
          <div className="section">
            <div className="cards-wrap">
              {
                newData.map(item => <NewPost
                  data={item}
                  key={item.id}
                />)
              }
            </div>
          </div>
        </main>
      </main>
    );
  }
}


BlogPage.propTypes = {
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
  itemsComments: state.Comments.items,
  isFetchingComments: state.Comments.isFetching,
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(postLoader(BlogPage));
