import React from 'react';
import PropTypes from 'prop-types';

import MessageGroup from './Components/MessageGroup';
import MessageField from './Components/MessageField';

import { getMessagesGroups } from 'utils/functions';

const MessagesList = ({
  messages,
  userId,
  sendMessage,
}) => {
  const groups = getMessagesGroups(messages);

  return (
    <div className="messages__content">
      <div className="messages__header">
        <a className="messages__back">
          <svg className="icon icon-arrow" viewBox="0 0 11.3 19.6">
            <path d="M0.7,0.6c-0.8,0.8-0.9,2.1-0.1,2.9l5.9,6.4l-5.9,6.3c-0.8,0.9-0.8,2.2,0.1,2.9 c0.9,0.7,2.1,0.7,2.9-0.1l7.2-7.8c0.1-0.1,0.1-0.1,0.2-0.2l0,0c0.1-0.1,0.1-0.2,0.2-0.3l0,0c0-0.1,0.1-0.2,0.1-0.3v-0.1 c0-0.1,0-0.2,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2V9.4c0-0.1-0.1-0.2-0.1-0.3l0,0C11.1,9,11.1,8.9,11,8.8 l0,0c-0.1-0.1-0.1-0.2-0.2-0.2L3.6,0.7C2.8-0.2,1.5-0.2,0.7,0.6z" />
          </svg>
        </a>
        <div className="dialog__avatar dialog__avatar_goods">
          <div className="avatar">
            <img className="avatar__img" src="/temp/10.png" />
          </div>
          <div className="avatar">
            <img className="avatar__img" src="/temp/3.png" />
          </div>
        </div>
        <div className="dialog__author">Шляпы из натуральной кожи <span className="dialog__price">500 руб.</span></div>
        <div className="dialog__preview">Студия "Мхи"</div>
      </div>
      <div className="messages__chat">
        {
          groups
            .map((group, idx) => <MessageGroup
              key={idx}
              data={group}
              userId={userId}
            />)
        }
      </div>
      <MessageField
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default MessagesList;
