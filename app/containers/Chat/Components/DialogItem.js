import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import AvatarPost from './AvatarPost';
import Avatar from './Avatar';

import { location, DOMAIN_URL } from 'config';

const DialogItem = ({
  data,
  onClick,
  isActive,
  deleteDialog,
}) => {
  const onClickDialog = () => onClick(data.id);
  const onDelete = () => deleteDialog(
    data.id,
    data.recipient.id,
    data.recipient.profile_name,
    data.recipient.avatar,
    data.recipient.city,
  );

  const dialogClass = isActive
    ? 'dialog active'
    : 'dialog';

  return (
    <div
      className={dialogClass}
      onClick={onClickDialog}
    >
      <svg
        onClick={onDelete}
        className="icon icon-delete"
        viewBox="0 0 23 23"
      >
        <path d="M15.4,11.5l6.8-6.8c1.1-1.1,1.1-2.8,0-3.9s-2.8-1.1-3.9,0l-6.8,6.8L4.7,0.8 c-1.1-1.1-2.8-1.1-3.9,0s-1.1,2.8,0,3.9l6.8,6.8l-6.8,6.8c-1.1,1.1-1.1,2.8,0,3.9c1.1,1.1,2.8,1.1,3.9,0l6.8-6.8l6.8,6.8 c1.1,1.1,2.8,1.1,3.9,0c1.1-1.1,1.1-2.8,0-3.9L15.4,11.5z" />
      </svg>
      <div className="dialog__avatar dialog__avatar_goods">
        {
          data.post
            ? <AvatarPost
              avatar={data.recipient.avatar}
              alt={data.recipient.profile_name || `User ID: ${data.recipient.id}`}
              postImg={data.post.image}
              postAlt={data.post.title}
            />
            : <Avatar
              avatar={data.recipient.avatar}
              alt={data.recipient.profile_name || `User ID: ${data.recipient.id}`}
            />
        }
      </div>
      <div className="dialog__author">
        {
          data.recipient.profile_name
            ? data.recipient.profile_name
            : `User with ID: ${data.recipient.id}`
        }
        <div className="dialog__date">
          {
            moment(data.last_message_sent)
              .locale(location)
              .format('D MMM')
          }
        </div>
      </div>
      <div className="dialog__preview">{data.last_message_text}</div>
      {
        data.unread_num > 0
        &&
        <div className="dialog__count">{data.unread_num}</div>
      }
    </div>
  );
};

export default DialogItem;
