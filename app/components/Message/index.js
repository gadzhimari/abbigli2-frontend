import React, { Component, PropTypes } from 'react';

import { FetchingButton } from 'components';

import { messagePopup } from 'ducks/Popup';
import { sendPrivateMessage } from 'ducks/Dialogs';

import { __t } from './../../i18n/translator';

import './index.styl';

const textAreaSucces = {
  border: '1px solid #90a4ae',
};

const textAreaError = {
  border: '1px solid #d10e0e',
};

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messageError: false,
    };
  }

  onUpdate = ({ target }) => {
    this.setState({
      message: target.value,
      messageError: false,
    });
  }

  sendMessage = () => {
    const { message } = this.state;
    const { dispatch, userId } = this.props;

    if (message) {
      dispatch(sendPrivateMessage(userId, { body: message }));
    } else {
      this.setState({
        messageError: true,
      });
    }
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(messagePopup(false));
  }


  render() {
    const {
      userName,
      sending,
    } = this.props;
    const { message, messageError } = this.state;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div className="popup" id="message-send-popup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="popup-close icon"
            onClick={this.closePopup}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          <div className="popup-title">{__t('message.to')} {userName}</div>
          <form className="popup-form">
            <div className="popup-form__field">
              <div className="textarea-wrap">
                <textarea
                  id="message"
                  style={messageError ? textAreaError : textAreaSucces}
                  value={message}
                  onChange={this.onUpdate}
                  className="textarea textarea--send-message"
                  placeholder={__t('Type a message...')}
                />
                {
                  messageError && !message.length
                    &&
                  <div className="popup__send-error">
                    {'This field should not be empty!'}
                  </div>
                }
              </div>
            </div>
            <div className="buttons-wrap">
              <FetchingButton
                className="default-button"
                onClick={this.sendMessage}
                isFetching={sending}
              >
                {__t('send.message')}
              </FetchingButton>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
