import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { location } from 'config';

import MessageItem from './MessageItem';

const MessageGroup = ({ data, userId }) => {

  return (
    <div className="messages__group">
      <div className="messages__group-day">
        {
          moment(data.messages[0].sent_at)
            .locale(location)
            .format('D MMMM')
        }
      </div>
      {
        data.messages
          .map((message, idx) => <MessageItem
            key={idx}
            userId={userId}
            data={message}
          />)
      }
    </div>
  );
};

export default MessageGroup;
