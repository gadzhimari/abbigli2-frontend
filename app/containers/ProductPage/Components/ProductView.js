import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import {
  ProductPreview,
  ProductInfo,
  AuthorSubscribe,
  Title,
  Text,
  CommentsBox,
  Share,
} from 'components';
import WantButton from './WantButton';

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wantText: '',
    };
  }

  onWantTextChange = ({ target }) => {
    this.setState({
      wantText: target.value,
    });
  }

  onSendWant = () => {
    const { sendMessage } = this.props;
    const { wantText } = this.state;

    sendMessage(wantText);
  }

  iconClick = () => {
    const { router } = this.props;

    if (history.state) {
      router.goBack();
    } else {
      router.push('/');
    }
  };

  render() {
    const {
      data,
      sendComment,
      commentsList,
      showWants,
      showWantsPopup,
      isAuthenticated,
      dispatch,
      myId,
      wantSending,
      priceTemplate,
    } = this.props;

    const location = window.location || {};

    return (
      <div className="product-card">
        <div className="product-container">
          {
            data.images && <ProductPreview images={data.images} />
          }
          <ProductInfo>
            <AuthorSubscribe user={data.user} slug={data.slug} />
            {
              data.title
              &&
              <Title
                iconClick={this.iconClick}
              >
                {data.title}
              </Title>
            }

            {
              data.content
              &&
              <Text>{data.content}</Text>
            }

            <div>
              <div className="product-price">
                {priceTemplate.replace('?', data.price)}
              </div>
              {
                data.user && data.user.id !== myId
                &&
                <WantButton
                  showWants={showWants}
                  onChange={this.onWantTextChange}
                  onSend={this.onSendWant}
                  showWantsPopup={showWantsPopup}
                  isSending={wantSending}
                />
              }

            </div>

            <div className="product-tags">
              <div className="product-tags__title">Теги</div>
              {
                data.tags
                &&
                data.tags.map(tag => (<a
                  className="tag-btn product-tag"
                  key={`${tag}--tags`}
                  href={`/tags/${tag}/`}
                >
                  #{tag}
                </a>))
              }
            </div>

            <div className="social-buttons">
              <Share
                postLink={`${location.pathname}`}
                buttonClass="social-btn"
              />
            </div>
          </ProductInfo>
        </div>

        <CommentsBox
          onSend={comment => (sendComment(comment))}
          slug={data.slug}
          likes={data.likes_num}
          comments={commentsList.length}
          list={commentsList}
          isAuthenticated={isAuthenticated}
          dispatch={dispatch}
          data={data}
        />
      </div>
    );
  }
}

ProductView.propTypes = {
  showWants: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  commentsList: PropTypes.array,
  data: PropTypes.object,
  myId: PropTypes.number,
  sendComment: PropTypes.func,
  renderSlider: PropTypes.func,
  showWantsPopup: PropTypes.func,
  dispatch: PropTypes.func,
  sendMessage: PropTypes.func,
};

export default withRouter(ProductView);
