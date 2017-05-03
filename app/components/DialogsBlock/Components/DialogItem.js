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
    deleteDialog(item.id, item.recipient.profile_name);
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
                  ? <img className="message__preview-img" alt="" src={item.recipient.avatar} />
                  : <div className="message__preview-img">
                    <svg className="icon">
                      <path fill="#1076ff" d="M9.601,22.721c-4,0-7.536-2.048-9.601-5.151 c0.048-3.185,6.4-4.929,9.601-4.929c3.184,0,9.553,1.744,9.6,4.929C17.136,20.673,13.601,22.721,9.601,22.721z M9.601,9.6 C6.944,9.6,4.8,7.457,4.8,4.801C4.8,2.145,6.944,0,9.601,0s4.8,2.145,4.8,4.801C14.4,7.457,12.257,9.6,9.601,9.6z"/>
                    </svg>
                  </div>
              }
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
