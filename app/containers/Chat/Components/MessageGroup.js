import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { location } from 'config';

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
  }
}

export default MessageGroup;
