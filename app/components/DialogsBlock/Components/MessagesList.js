import React, { Component, PropTypes } from 'react';
import {
  Loading,
} from 'components';

class MessagesList extends Component {
  componentDidUpdate() {
    if (this.messages) {
      this.messages.scrollTop = this.messages.scrollHeight;
    }
  }

  render() {
    const {
      list,
      fetchingStatus,
      onChangeMessage,
      messageValue,
      onSendMessage,
    } = this.props;

    return (
      <div className="messages__chat">
        {
          fetchingStatus
            ? <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate3d(-50%, -50%, 0)',
              }}
            >
              <Loading loading={fetchingStatus} />
            </div>
            : <div
              className="messages__container"
              id="messages-container"
              ref={container => (this.messages = container)}
            >
              {list}
            </div>
        }
        <form
          id="send_message"
          onSubmit={onSendMessage}
        >
          <div className="message__send">
            <input
              className="message__input"
              type="text"
              placeholder="Type a message..."
              onChange={onChangeMessage}
              value={messageValue}
            />
            <button
              className="message__send-button"
              type="button"
              onClick={onSendMessage}
            >
              <svg className="icon">
                <use href="#send"></use>
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

MessagesList.propTypes = {
  list: PropTypes.array.isRequired,
  fetchingStatus: PropTypes.bool.isRequired,
  onChangeMessage: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  messageValue: PropTypes.string.isRequired,
};

export default MessagesList;
