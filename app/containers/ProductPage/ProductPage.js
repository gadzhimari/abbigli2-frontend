import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';

import {
  Gallery,
  AuthorInfo,
  OtherArticles,
  BreadCrumbs,
  FavoriteAdd,
  RelativePosts,
  ProductPreview,
  Share,
} from '../../components';

import { Product } from '../../components/Cards';
import Price from './Price';
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

  constructor(props) {
    super(props);
    this.state = {
      profileId: null,
      want: false,
      messageError: false,
      showWants: false,
      result: {
        results: [],
      },
    };
  }

  componentDidMount() {
    this.globalWrapper = document.body;
    this.globalWrapper.classList.add('goods-post');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('goods-post');
  }

  handleFavorite = () => this.props.dispatch(toggleFavorite(this.props.data.slug))

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

  openWantsPopup = onlyAuthAction(openPopup.bind(null, 'sendPost'))

  handleWantsClick = () => {
    this.openWantsPopup({
      name: this.props.author.profile_name,
      sendMessage: this.sendMessage,
    });
  }

  renderSlider = () => {
    const { images } = this.props.data;

    const defaultImages = images &&
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
      dispatch,
      author,
      relativePosts,
      priceTemplate,
      me,
    } = this.props;
    const crumbs = [];

    if (data.category) {
      crumbs.push({
        title: data.category.title,
        url: data.category.view_on_site_url,
      });
    }

    crumbs.push({
      title: data.user.profile_name || `User ID: ${data.user.id}`,
      url: `/profile/${data.user.id}`,
    }, {
      title: data.title,
      url: `/blog/${data.slug}`,
    });

    const isUsersPost = author.id === me.id;

    return (
      <main>
        <div className="subscription-article">
          <div className="subscription-article__container">
            <AuthorInfo
              data={author}
              dispatch={dispatch}
              showSubscribeButton={!isUsersPost}
            />
            <OtherArticles articles={itemsAuthors} />
          </div>
        </div>
        <main className="main">
          <BreadCrumbs crumbs={crumbs} />
          <If condition={isUsersPost}>
            <Link
              to={`/profile/${author.id}/post/edit/${data.slug}`}
              className="default-button edit-post-button"
            >
              {__t('Edit')}
            </Link>
          </If>
          <div
            className="content"
            itemScope
            itemType="http://schema.org/Product"
          >
            <ProductPreview
              images={data.images}
              tags={data.tags}
              title={data.title}
            />
            <div className="goods-post__info">
              <div className="goods-post__favourite">
                <FavoriteAdd
                  toggleFavorite={this.handleFavorite}
                  isFavorited={data.favorite}
                />
              </div>
              <h1 className="section-title">
                <svg className="icon icon-bag" viewBox="0 0 53.3 45.9">
                  <path d="M51.3,17H39.1c-0.1-0.2-0.1-0.5-0.3-0.7L28.3,0.8c-0.1-0.2-0.3-0.3-0.5-0.5c0,0,0,0-0.1-0.1 c0,0,0,0,0,0C27.5,0.2,27.3,0.1,27,0c0,0,0,0,0,0c-0.1,0-0.3,0-0.4,0s-0.3,0-0.4,0c0,0,0,0,0,0c-0.2,0.1-0.5,0.1-0.7,0.3 c0,0,0,0,0,0c0,0,0,0-0.1,0.1c-0.2,0.1-0.3,0.3-0.5,0.5L14.5,16.3c-0.1,0.2-0.2,0.5-0.3,0.7H2c-1.3,0-2.3,1.3-1.9,2.5l7.4,25 c0.2,0.8,1,1.4,1.9,1.4h34.5c0.9,0,1.6-0.6,1.9-1.4l7.4-25C53.6,18.3,52.6,17,51.3,17z M26.6,5.5L34.4,17H18.8L26.6,5.5z M26.6,37.6 c-3.5,0-6.3-2.8-6.3-6.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3C32.9,34.8,30.1,37.6,26.6,37.6z" />
                </svg>
                <span className="section-title__text" itemProp="name">
                  {data.title}
                </span>
              </h1>
              <p itemProp="description">
                {data.content}
              </p>
              <div className="goods-post__buttons">
                <Price price={data.price} />

                <If condition={!isUsersPost}>
                  <button
                    className="want-button"
                    onClick={this.handleWantsClick}
                  >
                    <svg className="icon icon-bag" viewBox="0 0 53.3 45.9">
                      <path d="M51.3,17H39.1c-0.1-0.2-0.1-0.5-0.3-0.7L28.3,0.8c-0.1-0.2-0.3-0.3-0.5-0.5c0,0,0,0-0.1-0.1 c0,0,0,0,0,0C27.5,0.2,27.3,0.1,27,0c0,0,0,0,0,0c-0.1,0-0.3,0-0.4,0s-0.3,0-0.4,0c0,0,0,0,0,0c-0.2,0.1-0.5,0.1-0.7,0.3 c0,0,0,0,0,0c0,0,0,0-0.1,0.1c-0.2,0.1-0.3,0.3-0.5,0.5L14.5,16.3c-0.1,0.2-0.2,0.5-0.3,0.7H2c-1.3,0-2.3,1.3-1.9,2.5l7.4,25 c0.2,0.8,1,1.4,1.9,1.4h34.5c0.9,0,1.6-0.6,1.9-1.4l7.4-25C53.6,18.3,52.6,17,51.3,17z M26.6,5.5L34.4,17H18.8L26.6,5.5z M26.6,37.6 c-3.5,0-6.3-2.8-6.3-6.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3C32.9,34.8,30.1,37.6,26.6,37.6z" />
                    </svg>
                    {__t('Want it')}
                  </button>
                </If>

                <div className="social-networks">
                  <Share
                    buttonClass="social-btn"
                    postLink={data.view_on_site_url}
                  />
                </div>
              </div>
              <div className="goods-post__tags">
                {data.tags
                  .map((item, idx) => (
                    <Link className="tag" key={idx} to={`/find?tags=${item}`}>#{item}</Link>))
                }
              </div>
            </div>
          </div>
          <div className="section">
            <CommentsField onSend={this.sendComment} />
            <CommentsList comments={commentsList} />
          </div>

          <RelativePosts
            items={relativePosts}
            Component={Product}
            slug={data.slug}
            itemProps={{ priceTemplate }}
          />

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
