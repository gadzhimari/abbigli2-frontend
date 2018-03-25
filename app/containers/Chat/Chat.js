import React, { Component } from 'react';
import { connect } from 'react-redux';

import DialogsList from './DialogsList';
import MessagesList from './MessagesList';

import { openPopup } from '../../ducks/Popup/actions';
import { getDialogs, sendPrivateMessage, setActiveDialog, loadMessages } from '../../ducks/Dialogs/actions';

import { __t } from '../../i18n/translator';

import './Chat.less';

class Chat extends Component {
  state = {
    search: '',
  };

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

  changeSearch = ({ target }) => this.setState({
    search: target.value,
  })

  openDialog = (id) => {
    this.props.setActive(id);
    this.container.classList.add('open');
  }

  closeDialog = () => {
    this.container.classList.remove('open');
    this.props.closeDialog();
  };

  render() {
    const {
      dialogs,
      activeDialog,
      messages,
      isFetchingMessages,
      userId,
      deleteDialog,
      user,
    } = this.props;
    const { search } = this.state;

    let dialog;
    let filtredDialogs;

    if (activeDialog) {
      dialog = dialogs.filter(item => item.id === activeDialog)[0];
    }

    if (this.state.search.length > 0) {
      filtredDialogs = dialogs.filter(item => (
        item.recipient.profile_name.toLowerCase().includes(search.toLowerCase())
        || (item.post && item.post.title.toLowerCase().includes(search.toLowerCase()))
      ));
    } else {
      filtredDialogs = dialogs;
    }

    return (
      <main className="main">
        <div
          className="messages__container"
          ref={(container) => { this.container = container; }}
        >
          <DialogsList
            dialogs={filtredDialogs}
            setActive={this.openDialog}
            activeDialog={activeDialog}
            deleteDialog={deleteDialog}
            changeSearch={this.changeSearch}
            user={user}
          />
          {
            activeDialog
              ? <MessagesList
                messages={messages}
                activeDialog={activeDialog}
                isFetching={isFetchingMessages}
                userId={userId}
                sendMessage={this.sendMessage}
                post={dialog.post}
                recipient={dialog.recipient}
                closeDialog={this.closeDialog}
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
  user: Auth.me,
});

const mapDispatchToProps = dispatch => ({
  getDialogs: () => dispatch(getDialogs()),
  setActive: id => dispatch(
    dispatch(setActiveDialog(id)),
    dispatch(loadMessages(id))
  ),
  deleteDialog: (id, userID, name, avatar, city) => dispatch(openPopup('deleteMessagePopup', {
    id,
    name: name || `User ID: ${userID}`,
    avatar,
    city,
  })),
  closeDialog: () => dispatch(setActiveDialog(null)),
  sendMessage: (sender, message, dialogID) => dispatch(
    sendPrivateMessage(sender, message, dialogID)
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
