import React, { Component, PropTypes } from 'react';
import {
  Gallery,
} from 'components';

import {
  NotFound,
} from 'containers';

import ProductView from './Components/BlogView';
import loaderDecorator from './Components/loaderDecorator';

import Helmet from 'react-helmet';
import { connect } from 'preact-redux';
import { sendComment } from 'ducks/Comments';
import BlogsPopular from './BlogsPopular';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


class BlogPage extends Component {
  sendComment = comment => {
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
    const {
      title,
      images,
      seo_title,
      seo_description,
    } = this.props.data;

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
        <Helmet
          title={seo_title ? seo_title : title}
          meta={[
            { "name": "description", "content": seo_description },
            (images && images.length) ? { property: 'og:image', content: images[0].file } : {},
          ]}
        />
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

export default connect(mapStateToProps)(loaderDecorator(BlogPage));
