import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogsList from './DialogsList';
import MessagesList from './MessagesList';

import { openPopup } from 'ducks/Popup/actions';
import { getDialogs, sendPrivateMessage, setActiveDialog, loadMessages } from 'ducks/Dialogs';

import { __t } from '../../i18n/translator';

import './Chat.less';

class Chat extends Component {
  componentDidMount() {
    this.props.getDialogs();

    this.globalWrapper = document.querySelector('.global-wrapper');
    this.globalWrapper.classList.add('messages');
  }

  componentWillUnmount() {
    this.globalWrapper.classList.remove('messages');
  }

  sendMessage = (text) => {
    const { sendMessage, userId, activeDialog, dialogs } = this.props;

    const message = {
      body: text,
      sender: {
        id: Number(userId),
      },
      sent_at: new Date(),
    };

    const recipient = dialogs
      .filter(dialog => dialog.id === activeDialog)[0].recipient;

    sendMessage(recipient.id, message, activeDialog);
  }

  render() {
    const {
      dialogs,
      setActive,
      activeDialog,
      messages,
      isFetchingMessages,
      userId,
      deleteDialog,
    } = this.props;

    return (
      <main className="main">
        <div className="messages__container">
          <DialogsList
            dialogs={dialogs}
            setActive={setActive}
            activeDialog={activeDialog}
            deleteDialog={deleteDialog}
          />
          {
            activeDialog
              ? <MessagesList
                messages={messages}
                activeDialog={activeDialog}
                isFetching={isFetchingMessages}
                userId={userId}
                sendMessage={this.sendMessage}
              />
              : <div className="messages__content">
                <h5
                  className="messages__content-text"
                >
                  {__t('In this section you see your correspondence with other ABBIGLI members.')}
                </h5>
              </div>
          }
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ Dialogs, Auth }) => ({
  dialogs: Dialogs.dialogs,
  isFetchingDialogs: Dialogs.dialogs.isFetching,
  activeDialog: Dialogs.activeDialog,
  messages: Dialogs.messages,
  isFetchingMessages: Dialogs.messagesIsFetching,
  userId: Auth.me.id,
});

const mapDispatchToProps = dispatch => ({
  getDialogs: () => dispatch(getDialogs()),
  setActive: id => dispatch(
    dispatch(setActiveDialog(id)),
    dispatch(loadMessages(id))),
  deleteDialog: (id, userID, name, avatar, city) => dispatch(openPopup('deleteMessagePopup', {
    id,
    name: name || `User ID: ${userID}`,
    avatar,
    city,
  })),
  sendMessage: (sender, message, dialogID) => dispatch(sendPrivateMessage(sender, message, dialogID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
