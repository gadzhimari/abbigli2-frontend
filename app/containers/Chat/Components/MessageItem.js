import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { location, DOMAIN_URL } from 'config';

const MessageItem = ({
  data,
  userId,
}) => {
  const fromMe = userId === data.sender.id;
  const messageClass = fromMe
    ? 'message message_from-me'
    : 'message';

  return (
    <div className={messageClass}>
      {
        !fromMe
        &&
        <div className="avatar">
          {
            data.sender.avatar
              ? <img className="avatar__img" src={`${DOMAIN_URL}thumbs/unsafe/113x113/${data.sender.avatar}`} alt={data.recipient.profile_name} />
              : <img className="avatar__img" src="/images/svg/avatar.svg" alt={data.sender.profile_name} />
          }
        </div>
      }
      <div className="message__text">
        {data.body}
      </div>
      <div className="message__time">
        {
          moment(data.sent_at)
            .locale(location)
            .format('LT')
        }
      </div>
    </div>
  );
};

export default MessageItem;
