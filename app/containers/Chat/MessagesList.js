import React from 'react';
import PropTypes from 'prop-types';

import MessageGroup from './Components/MessageGroup';
import MessageField from './Components/MessageField';
import RecipientInfo from './Components/RecipientInfo';
import { Loading } from 'components';

import { getMessagesGroups } from 'utils/functions';

const MessagesList = ({
  messages,
  userId,
  sendMessage,
  post,
  recipient,
  isFetching,
  closeDialog,
}) => {
  const groups = getMessagesGroups(messages);

  return isFetching
    ? (<div className="messages__content">
      <div className="messages__preloader-wrapper">
        <Loading loading={isFetching} />
      </div>
    </div>)
    : (<div className="messages__content">
      <RecipientInfo
        post={post}
        user={recipient}
        closeDialog={closeDialog}
      />
      <div className="messages__chat" >
        {
          groups
            .map((group, idx) => <MessageGroup
              key={idx}
              data={group}
              userId={userId}
            />)
        }
      </div >
      <MessageField
        sendMessage={sendMessage}
      />
    </div >
    );
};

export default MessagesList;
