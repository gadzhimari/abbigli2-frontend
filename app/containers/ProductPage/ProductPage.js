import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  CardsWrap,
  CardProduct,
  Gallery,
} from 'components';

import { NotFound } from 'containers';

import postLoader from 'App/HOC/postLoader';
import ProductView from './Components/ProductView';

import { sendComment } from 'ducks/Comments';
import { sendPostMessage } from 'ducks/Dialogs';

import { fetchData as fetchDataComments } from 'ducks/Comments';
import { fetchPost, resetPost } from 'ducks/PostPage/actions';
import { fetchData as fetchDataAuthors } from 'ducks/ProfilePosts';

import { stagedPopup } from 'ducks/Auth/authActions';

import { __t } from './../../i18n/translator';

class ProductPage extends Component {
  static fetchData = (dispatch, params, token) => dispatch(fetchPost(params.slug, 1, token));

  static fetchSubData = (dispatch, data) => Promise.all([
    dispatch(fetchDataComments(data.slug)),
    dispatch(fetchDataAuthors({
      type: 'posts',
      excludeId: data.id,
      profileId: data.user.id,
    })),
  ])

  static onUnmount = (dispatch) => {
    dispatch(resetPost());
  }

  static prerenderData = ({ store }, nextState, replace, callback) => {
    Promise.all([
      store.dispatch(fetchPost(nextState.params.slug, 1)),
    ]).then(() => callback());
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

  onUpdate(e) {
    this.setState({
      message: e.target.value,
      messageError: false,
    });
  }

  sendComment = (comment) => {
    const { dispatch } = this.props;

    dispatch(sendComment(comment));
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

  showOrHideWants = (show) => {
    const { dispatch, isAuthenticated } = this.props;

    if (isAuthenticated) {
      this.setState({
        showWants: show,
      });
    } else {
      dispatch(stagedPopup('register'));
    }
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
      id,
      images,
      title,
      price,
      sections,
      seo_title,
      seo_description,
    } = this.props.data;

    const {
      itemsPosts,
      isDefined,
      wantSending,
      data,
      dispatch,
      isAuthenticated,
      me,
      priceTemplate,
    } = this.props;

    const { showWants } = this.state;

    const commentsList = this.props.itemsComments;
    const post = { id, title, sections, images, price };

    return (
      <div className="container-fluid product-page">
        {
          isDefined
            ? (<div>
              <ProductView
                data={data}
                sendComment={this.sendComment}
                commentsList={commentsList}
                renderSlider={this.renderSlider}
                showWants={showWants}
                showWantsPopup={this.showOrHideWants}
                sendMessage={this.sendMessage}
                isAuthenticated={isAuthenticated}
                dispatch={dispatch}
                myId={me.id}
                wantSending={wantSending}
                priceTemplate={priceTemplate}
              />
              <CardsWrap title={__t('More from author')}>
                {
                  itemsPosts.length > 0
                  &&
                  itemsPosts.map(item => <CardProduct
                    data={item}
                    key={item.slug}
                    legacy
                    dispatch={dispatch}
                    isAuthenticated={isAuthenticated}
                  />)
                }
              </CardsWrap>
            </div>)
            : <NotFound />
        }
      </div>
    );
  }
}

ProductPage.propTypes = {
  data: PropTypes.object.isRequired,
  me: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  priceTemplate: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    data: state.PostPage.post,
    isFetching: state.PostPage.isFetchingPost,
    isDefined: state.PostPage.isDefined,
    itemsPosts: state.ProfilePosts.items,
    isFetchingPosts: state.ProfilePosts.isFetching,
    itemsComments: state.Comments.items,
    isFetchingComments: state.Comments.isFetching,
    showWants: state.Popup.showWants,
    isAuthenticated: state.Auth.isAuthenticated,
    me: state.Auth.me,
    wantSending: state.Dialogs.isSending,
    priceTemplate: state.Settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps)(postLoader(ProductPage));
