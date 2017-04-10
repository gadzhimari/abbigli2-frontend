import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import {
  ProductPreview,
  ProductInfo,
  AuthorSubscribe,
  Title,
  Text,
  CommentsBox,
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
              <a
                className="social-btn pinterest"
                href={`https://www.pinterest.com/pin/create/button/?url=${location.href}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.912 15.975">
                  <path d="M2.34,9.239c0.802-1.365-0.258-1.664-0.425-2.654c-0.679-4.043,4.847-6.806,7.741-3.98
                    c2.002,1.957,0.684,7.975-2.545,7.348C4.02,9.356,8.626,4.567,6.158,3.626c-2.006-0.765-3.071,2.337-2.12,3.878
	                c-0.559,2.651-1.76,5.147-1.273,8.471c1.577-1.102,2.109-3.211,2.545-5.41c0.793,0.465,1.217,0.946,2.228,1.021
	                c3.727,0.277,5.81-3.581,5.299-7.145c-0.452-3.157-3.722-4.764-7.21-4.388C2.869,0.352,0.12,2.498,0.006,5.565
	                C-0.063,7.438,0.488,8.844,2.34,9.239z"
                />
              </svg>
              </a>
              <a
                className="social-btn facebook"
                href={`https://www.facebook.com/sharer.php?u=${location.href}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
                  <path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
                    c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"
                />
              </svg>
              </a>
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
