import React, { PropTypes } from 'react';

import { DOMAIN_URL } from 'config';

const DialogItem = (props) => {
  const {
    item,
    clickHandler,
    isActive,
    deleteDialog,
  } = props;
  const dialogDefaultClass = item.unread_num !== 0
    ? 'message-item new'
    : 'message-item';
  const dialogText = item.last_message_text
    ? item.last_message_text
    : '';
  const dialogActiveClass = isActive
    ? `${dialogDefaultClass} active`
    : dialogDefaultClass;

  const dialogClick = () => {
    clickHandler(item.id);
  };
  const removeDialog = () => {
    deleteDialog(item.id, item.recipient.profile_name, item.recipient.avatar, item.recipient.city);
  };

  const userName = item.recipient && item.recipient.profile_name
    ? item.recipient.profile_name
    : `User with ID: ${item.recipient.id}`;

  const lastMessage = dialogText.includes('title-message')
    ? 'Product message'
    : item.last_message_text;

  return (
    <div
      key={item.id}
      className={dialogActiveClass}
      onClick={dialogClick}
    >
      {
        !item.post
          ? <div className="message__preview-wrap">
            <div className="message__preview img-round">
              {
                item.recipient && item.recipient.avatar
                  ? <img
                    className="message__preview-img"
                    alt={item.recipient.profile_name}
                    src={`${DOMAIN_URL}thumbs/unsafe/100x100/${item.recipient.avatar}`}
                  />
                  : <img
                    className="message__preview-img"
                    src={'/images/svg/avatar.svg'}
                    alt={item.recipient.profile_name}
                  />
              }
            </div>
            <div className="message__icon">
              <svg className="icon" viewBox="0 0 10 8">
                <path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2 L5,4.5L1,2V1l4,2.5L9,1V2z"/>
              </svg>
            </div>
          </div>
          : <div className="message__preview-wrap">
            <div className="message__preview">
              <img className="message__preview-img" src={item.post.image} />
            </div>
            <div className="message__avatar">
              <img className="message__avatar-img" src={item.recipient.avatar} />
            </div>
          </div>
      }
      <div className="message__attributes">
        <div className="message__author">
          {userName}
        </div>
        <div className="message__theme">
          {
            !item.post
              ? 'Private message'
              : item.post.title
            }
        </div>
        <div className="message__text">
          {lastMessage}
        </div>
        {
          item.unread_num !== 0
          &&
          <div className="message__notification">
            {item.unread_num}
          </div>
        }
      </div>
      <div
        className="message__delete"
        onClick={removeDialog}
      >
        <svg
          className="icon"
        >
          <use href="#remove"></use>
        </svg>
        <div className="message__date">
          {item.last_message_sent_format}
        </div>
      </div>
    </div>
  );
};

DialogItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
  deleteDialog: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default DialogItem;
