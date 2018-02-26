import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { MESSAGE_DATE_SHORT_FORMAT } from '../../../lib/date/formats';

import MessageItem from './MessageItem';

class MessageGroup extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      date: PropTypes.string,
      messages: PropTypes.array,
    }).isRequired,
    userId: PropTypes.number.isRequired,
  };

  render() {
    const { data, userId } = this.props;

    return (
      <div className="messages__group">
        <div className="messages__group-day">
          {
            toLocaleDateString(data.messages[0].sent_at,
              MESSAGE_DATE_SHORT_FORMAT)
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
  }
}

export default MessageGroup;
