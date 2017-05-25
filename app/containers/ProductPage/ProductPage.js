import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  CardsWrap,
  CardProduct,
  Gallery,
} from 'components';

import {
  NotFound,
} from 'containers';

import postLoader from 'App/HOC/postLoader';
import ProductView from './Components/ProductView';

import { sendComment } from 'ducks/Comments';
import { sendPostMessage } from 'ducks/Dialogs';

import { fetchData as fetchDataComments } from 'ducks/Comments';
import { fetchData } from 'ducks/BlogPost';

import { stagedPopup } from 'ducks/Auth/authActions';

import { __t } from './../../i18n/translator';

class ProductPage extends Component {
  static fetchData = (dispatch, params, token) => Promise.all([
    dispatch(fetchData(params.slug, 1, token)),
    dispatch(fetchDataComments(params.slug)),
  ]);

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
        <Helmet
          title={data.seo_title ? data.seo_title : data.title}
          meta={[
            { name: 'description', content: data.seo_description },
            { property: 'og:title', content: data.seo_title || data.title },
            { property: 'og:description', content: data.seo_description },
            { property: 'og:', content: data.seo_description },
            { property: 'og:image', content: data.images[0].file },
          ]}
        />
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
  const {
    isFetching,
    data,
    isDefined,
  } = (state.BlogPost) || {
      isFetching: true,
      data: {},
      isDefined: true,
    };
  const { showWants } = state.Popup;
  const comments = (state.Comments) || { isFetching: true, items: [] };
  const posts = (state.ProfilePosts) || { isFetching: true, items: [] };
  const auth = state.Auth || {
    isAuthenticated: false,
    me: {},
  };
  const dialogs = state.Dialogs || {};
  const settings = state.Settings || {};

  return {
    data,
    isFetching,
    isDefined,
    itemsPosts: posts.items,
    isFetchingPosts: posts.isFetching,
    itemsComments: comments.items,
    isFetchingComments: comments.isFetching,
    showWants,
    isAuthenticated: auth.isAuthenticated,
    me: auth.me,
    wantSending: dialogs.isSending,
    priceTemplate: settings.data.CURRENCY,
  };
}

export default connect(mapStateToProps)(postLoader(ProductPage));
