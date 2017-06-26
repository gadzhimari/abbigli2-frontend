import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import DialogsList from './Components/DialogsList';
import MessagesList from './Components/MessagesList';

import { openPopup } from 'ducks/Popup/actions';
import { sendPrivateMessage, setActiveDialog, loadMessages } from 'ducks/Dialogs';

import { location } from 'config';
import { DOMAIN_URL } from 'config';

import { __t } from '../../i18n/translator';

import './index.styl';


class DialogsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      messageValue: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { activeDialog } = this.props;

    if (prevProps.activeDialog !== activeDialog) {
      this.setState({
        messageValue: '',
      });
    }
  }


  onClickDialog = (dialogId) => {
    const { dispatch } = this.props;

    this.messagesWrap.classList.add('open');
    dispatch(setActiveDialog(dialogId));
    dispatch(loadMessages(dialogId));
  }

  onSendMessage = (e) => {
    e.preventDefault();

    const { dispatch, id, activeDialog, dialogs } = this.props;
    const { messageValue } = this.state;
    const object = {
      body: messageValue,
      sender: {
        id: Number(id),
      },
      temp_sent_at: new Date(),
    };
    const recipient = dialogs
      .filter(dialog => dialog.id === activeDialog)[0].recipient;

    dispatch(sendPrivateMessage(recipient.id, object, activeDialog));
    this.setState({
      messageValue: '',
    });
  }

  onChangeMessage = ({ target }) => {
    this.setState({
      messageValue: target.value,
    });
  }

  doSearch = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  deleteDialog = (id, recipient) => {
    const { dispatch } = this.props;

    dispatch(openPopup('deleteMessagePopup', {
      id,
      recipient,
    }));
  }

  scrollMessages = () => {
    const objDiv = document.getElementById('messages-container');

    objDiv.scrollTop = objDiv.scrollHeight;
  }


  generateNameGroup = (item) => {
    const sentAt = moment(item.sent_at);
    const nowMoment = moment();
    const daysDiff = nowMoment.diff(sentAt, 'days');
    let groupName = sentAt.locale(location).format('D MMMM YYYY');

    if (daysDiff < 356) {
      if (daysDiff > 1) {
        groupName = sentAt.locale(location).format('D MMMM');
      } else if (daysDiff == 1) {
        groupName = 'Yesterday';
      } else {
        groupName = 'Today';
      }
    }

    item.tempSentAt = sentAt.locale(location).format('HH:mm');

    return groupName;
  }

  closeMobileDialog = () => {
    const { dispatch } = this.props;

    this.messagesWrap.classList.remove('open');
    dispatch(setActiveDialog(null));
  }

  render() {
    const {
      id,
      dialogs,
      activeDialog,
      messages,
      messagesIsFetching,
    } = this.props;

    const { query, messageValue } = this.state;
    const dialog = dialogs.filter(item => item.id === activeDialog)[0];
    const post = dialog && dialog.post;

    const datedDialogs = dialogs.map((item) => {
      const newItem = item;
      const momentData = moment(item.last_message_sent);
      const momentToday = moment();
      let lastMessageSent = momentData.locale(location).format('D MMMM YYYY');

      if (momentData.format('D MMMM YYYY') === momentToday.format('D MMMM YYYY')) {
        lastMessageSent = momentData.locale(location).format('HH:mm');
      } else if (momentData.format('YYYY') === momentToday.format('YYYY')) {
        lastMessageSent = momentData.locale(location).format('D MMMM');
      }

      newItem.last_message_sent_format = lastMessageSent;

      return newItem;
    });

    const groupsTemp = [];

    messages.forEach((item, idx) => {
      item.name = this.generateNameGroup(item);
      item.id = idx;

      if (post && idx === 0) {
        item.post = post;
      }

      if (groupsTemp.includes(item.name)) return;

      groupsTemp.push(item.name);
    });

    const formatedMessages = groupsTemp.map((group, idx) => (
      <div
        className="message__group"
        key={`${idx}--group`}
      >
        <div className="message__group-name">
          {group}
        </div>
        {
          messages.map((item, indx) => {
            if (item.name === group) {
              return (
                <div
                  className={item.sender.id === Number(id) ? 'message message-user' : 'message'}
                  key={`${item.id}--message`}
                >
                  <div className="message__ava">
                    {
                      item.sender.id !== Number(id)
                      &&
                      <img
                        className="message__ava-img"
                        src={
                          !item.sender.avatar
                            ? 'http://abbigli.ru/static/new_theme/images/svg/avatar.svg'
                            : item.sender.avatar
                        }
                      />
                    }
                  </div>
                  <div
                    className="message__content-wrap"
                  >
                    <div
                      className="message__content"
                    >
                      {
                        post && indx === 0
                        &&
                        <div>
                          <span className="title-message">
                            {post.title}
                          </span>
                          <br />
                          <span className="price">
                            {
                              location === 'en'
                                ? `$ ${post.price}`
                                : `${post.price} рублей`
                            }
                          </span>
                          <br />
                          <img
                            src={`${DOMAIN_URL}thumbs/unsafe/350x196/${post.image}`}
                            alt={post.title}
                          />
                        </div>
                      }
                      {item.body}
                    </div>
                  </div>
                  <div className="message__time">
                    {item.tempSentAt}
                  </div>
                </div>
              );
            }
            return null;
          })
        }
      </div>
    ));

    return (
      <div>
        <div id="profile_content">
          <div className="messages-container">
            <div className="messages__search-bar">
              <div className="message-search__wrap">
                <div className="message-search">
                  <input
                    className="message-search__input"
                    onChange={this.doSearch}
                    type="text"
                    placeholder={__t('Search')}
                    value={query}
                  />
                  <svg className="search-icon">
                    <use href="#search"></use>
                  </svg>
                </div>
              </div>
              <DialogsList
                list={datedDialogs}
                filter={query}
                dialogClickHandler={this.onClickDialog}
                activeDialog={activeDialog}
                deleteDialog={this.deleteDialog}
              />
            </div>
            <div
              className="messages__chat-wrap"
              ref={wrap => (this.messagesWrap = wrap)}
            >
              {
                !!activeDialog
                &&
                <button
                  className="messages__back-button"
                  onClick={this.closeMobileDialog}
                >
                  {__t('Go back to dialogs list')}
                </button>
              }
              {
                !activeDialog && !messagesIsFetching
                  ? <h5
                    style={{
                      margin: '35px 0px',
                      width: '100%',
                      textAlign: 'center',
                      color: 'rgb(138, 144, 147)',
                    }}
                  >
                    {__t('In this section you see your correspondence with other ABBIGLI members.')}
                  </h5>
                  : <MessagesList
                    list={formatedMessages}
                    fetchingStatus={messagesIsFetching}
                    onChangeMessage={this.onChangeMessage}
                    messageValue={messageValue}
                    onSendMessage={this.onSendMessage}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DialogsBlock.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dialogs: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  activeDialog: PropTypes.any,
  messagesIsFetching: PropTypes.bool.isRequired,
};

export default DialogsBlock;

