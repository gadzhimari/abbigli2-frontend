import React from 'react';

import AvatarPost from './AvatarPost';
import Avatar from '../../../components/Avatar';

import toLocaleDateString from '../../../lib/date/toLocaleDateString';
import { DAY_WITH_FULL_MONTH } from '../../../lib/date/formats';

const DialogItem = ({
  data,
  onClick,
  isActive,
  deleteDialog,
}) => {
  const onClickDialog = () => onClick(data.id);
  const onDelete = (e) => {
    e.stopPropagation();

    deleteDialog(
      data.id,
      data.recipient.id,
      data.recipient.profile_name,
      data.recipient.avatar,
      data.recipient.city
    );
  };

  const dialogClass = isActive
    ? 'dialog active'
    : 'dialog';

  const avatarProps = {
    thumbSize: '60x60',
    avatar: data.recipient.avatar,
    alt: data.recipient.profile_name || `User ID: ${data.recipient.id}`
  };

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
          data.object
            ? <AvatarPost
              {...avatarProps}
              postImg={data.object.image}
              postAlt={data.object.title}
            />
            : <Avatar
              {...avatarProps}
              className="avatar avatar_round"
              imgClassName="avatar__image"
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
            toLocaleDateString(
              data.last_message_sent,
              DAY_WITH_FULL_MONTH
            )
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
