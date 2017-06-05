import React, { PropTypes } from 'react';

import { DOMAIN_URL } from 'config';

const MessageItem = (props) => {
  const { item } = props;

  return (<div className="message__group">
    <div className="message__group-name">
      {group}
    </div>
    {
      this.state.loadMessages.map((item) => {
      if (item.name === group) {
        return (<div className={item.sender.id == id ? 'message message-user' : 'message'} key={item.key}>
          <div className="message__ava">
            {item.sender.id != id &&
              <img className="message__ava-img"
                src={!item.sender.avatar
                ? '/images/svg/avatar.svg'
                : `${DOMAIN_URL}thumbs/unsafe/60x60/${item.sender.avatar}`
              }
              />
            }
          </div>
          <div className="message__content-wrap">
            <div dangerouslySetInnerHTML={{ __html: item.body }} className="message__content"></div>
          </div>
          <div className="message__time">{item.temp_sent_at}</div>
        </div>)
      }
    })}
  </div>);
};

MessageItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MessageItem;
