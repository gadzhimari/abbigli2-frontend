import React, { Component, PropTypes } from 'react';

import {
  CardsWrap,
  CardProduct,
  Gallery,
} from 'components';

import {
  NotFound,
} from 'containers';

import loaderDecorator from './Components/loaderDecorator';
import ProductView from './Components/ProductView';

import { connect } from 'preact-redux';
import Helmet from 'react-helmet';
import { sendComment } from 'ducks/Comments';
import { sendPostMessage } from 'ducks/Dialogs';
import { wantsPopup, registerPopup } from 'ducks/Popup';

import { __t } from './../../i18n/translator';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: null,
      want: false,
      messageError: false,
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

  sendComment = comment => {
    const { dispatch } = this.props;

    dispatch(sendComment(comment));
  }

  sendMessage = message => {
    const { dispatch, data } = this.props;
    const post = {
      id: data.id,
      title: data.title,
      sections: data.sections,
      images: data.images,
      price: data.price,
    };

    dispatch(sendPostMessage(data.user.id, post, message));
  }

  showOrHideWants = show => {
    const { dispatch, isAuthenticated } = this.props;

    if (isAuthenticated) {
      dispatch(wantsPopup(show));
    } else {
      dispatch(registerPopup());
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
      showWants,
      isDefined,
      wantSending,
      data,
      dispatch,
      isAuthenticated,
      me,
      } = this.props;

    const commentsList = this.props.itemsComments;
    const post = { id, title, sections, images, price };

    return (
      <div className="container-fluid product-page">
        <Helmet
          title={seo_title ? seo_title : title}
          meta={[
            { name: 'description', content: seo_description },
            { property: 'og:title', content: seo_title },
            { property: 'og:description', content: seo_description },
            { property: 'og:image', content: images[0].file },
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
  };
}

export default connect(mapStateToProps)(loaderDecorator(ProductPage));
