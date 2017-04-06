import React, { PropTypes } from 'react';

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
  const dialogActiveClass = isActive
    ? `${dialogDefaultClass} active`
    : dialogDefaultClass;

  const dialogClick = () => {
    clickHandler(item.id);
  };
  const removeDialog = () => {
    deleteDialog(item.id, item.recipient.profile_name);
  };

  const userName = item.recipient && item.recipient.profile_name
    ? item.recipient.profile_name
    : `User with ID: ${item.recipient.id}`;

  const lastMessage = item.last_message_text.includes('title-message')
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
              <img
                className="message__preview-img"
                src={item.recipient && item.recipient.avatar
                  ? item.recipient.avatar
                  : 'http://abbigli.ru/static/new_theme/images/svg/avatar.svg'
                }
              />
            </div>
            <div className="message__icon">
              <svg className="icon">
                <use href="#message" />
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
