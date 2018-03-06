import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageGroup from './Components/MessageGroup';
import MessageField from './Components/MessageField';
import RecipientInfo from './Components/RecipientInfo';
import { Spin } from '../../components-lib';

import { getMessagesGroups } from 'utils/functions';

class MessagesList extends Component {

  componentDidUpdate() {
    this.scrollChatToBottom();
  }

  scrollChatToBottom = () => {
    this.chat.scrollTop = this.chat.scrollHeight - this.chat.offsetHeight;
  }

  render() {
    const {
      messages,
      userId,
      sendMessage,
      post,
      recipient,
      isFetching,
      closeDialog,
    } = this.props;

    const groups = getMessagesGroups(messages);

    return isFetching
      ? (<div className="messages__content">
        <div className="messages__preloader-wrapper">
          <div className="spin-wrapper">
            <Spin visible={isFetching} />
          </div>
        </div>
      </div>)
      : (<div className="messages__content">
        <RecipientInfo
          post={post}
          user={recipient}
          closeDialog={closeDialog}
        />
        <div
          className="messages__chat"
          ref={chat => (this.chat = chat)}
        >
          {
            groups
              .map((group, idx) => <MessageGroup
                key={idx}
                data={group}
                userId={userId}
              />)
          }
        </div >
        <MessageField
          sendMessage={sendMessage}
        />
      </div >
      );
  }
}

MessagesList.defaultProps = {
  post: null,
};

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  sendMessage: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    price: PropTypes.number,
    slug: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  recipient: PropTypes.shape({
    avatar: PropTypes.string,
    profile_name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default MessagesList;
