import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { NotFound } from 'containers';
import { Gallery } from 'components';
import postLoader from 'App/HOC/postLoader';
import ProductView from './Components/BlogView';

import { sendComment } from 'ducks/Comments';
import BlogsPopular from './BlogsPopular';

import { fetchData as fetchBlogs, resetData } from 'ducks/BlogPost';
import { fetchData as fetchDataBlogs } from 'ducks/Blogs';
import { fetchData as fetchDataComments } from 'ducks/Comments';
import { fetchData as fetchDataAuthors } from 'ducks/ProfilePosts';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


class BlogPage extends Component {
  static fetchData = (dispatch, params, token) => dispatch(fetchBlogs(params.slug, 4, token))

  static fetchSubData = (dispatch, data, params) => Promise.all([
    dispatch(fetchDataBlogs(1)),
    dispatch(fetchDataComments(params.slug)),
    dispatch(fetchDataAuthors({
      type: 'posts',
      excludeId: data.id,
      profileId: data.user.id,
    })),
  ])

  static onUnmount = (dispatch) => {
    dispatch(resetData());
  }

  sendComment = (comment) => {
    const { dispatch } = this.props;

    dispatch(sendComment(comment));
  }

  renderSlider = () => {
    const {
      images,
    } = this.props.data;

    const defaultImages = images
      &&
      images
        .filter(item => item.type !== 'redactor')
        .map(image => ({
          original: image.file,
          thumbnail: image.file,
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
    } = this.props;

    return (
      <div className="container-fluid blog-detail-page">
        {
          isDefined
            ? (<div>
              <ProductView
                isFetchingBlogs={isFetchingBlogs}
                isFetchingAuthors={isFetchingAuthors}
                itemsAuthors={itemsAuthors}
                itemsBlogs={itemsBlogs}
                sendComment={this.sendComment}
                commentsList={commentsList}
                data={data}
                renderSlider={this.renderSlider}
                isAuthenticated={isAuthenticated}
                dispatch={dispatch}
              />
              <BlogsPopular />
            </div>)
            : <NotFound />
        }
      </div>
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

function mapStateToProps(state) {
  const {
    isFetching,
    data,
    isDefined,
  } = (state.BlogPost) || {
      isFetching: true,
      data: {},
      isDefined: true,
    };

  const blogs = (state.Blogs) || { isFetching: true, items: [] };
  const authors = (state.ProfilePosts) || { isFetching: true, items: [] };
  const comments = (state.Comments) || { isFetching: true, items: [] };
  const auth = state.Auth || {
    isAuthenticated: false,
  };

  return {
    data,
    isFetching,
    isDefined,
    itemsBlogs: blogs.items,
    isFetchingBlogs: blogs.isFetching,
    itemsAuthors: authors.items,
    isFetchingAuthors: authors.isFetching,
    itemsComments: comments.items,
    isFetchingComments: comments.isFetching,
    isAuthenticated: auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(postLoader(BlogPage));
