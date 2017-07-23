import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Link } from 'react-router';

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
        <Link to={`/profile/${data.sender.id}`}>
          <div className="avatar">
            {
              data.sender.avatar
                ? <img className="avatar__img" src={`${DOMAIN_URL}thumbs/unsafe/113x113/${data.sender.avatar}`} alt={data.recipient.profile_name} />
                : <img className="avatar__img" src="/images/svg/avatar.svg" alt={data.sender.profile_name} />
            }
          </div>
        </Link>
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

MessageItem.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string,
    sender: PropTypes.shape({
      avatar: PropTypes.string,
      id: PropTypes.number,
    }),
    sent_at: PropTypes.date,
  }).isRequired,
  userId: PropTypes.number.isRequired,
};

export default MessageItem;
