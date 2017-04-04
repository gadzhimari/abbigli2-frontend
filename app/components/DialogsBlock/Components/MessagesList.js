import React, { PropTypes } from 'react';
import {
  Loading,
} from 'components';

const MessagesList = (props) => {
  const { list, fetchingStatus } = props;

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
          : <div className="messages__container" id="messages-container">
            {list}
          </div>
      }
      <form id="send_message">
        <div className="message__send">
          <input
            className="message__input"
            type="text"
            placeholder="Type a message..."
          />
          <button
            className="message__send-button"
            type="button"
          >
            <svg className="icon">
              <use href="#send"></use>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

MessagesList.propTypes = {
  list: PropTypes.array.isRequired,
  fetchingStatus: PropTypes.bool.isRequired,
};

export default MessagesList;
