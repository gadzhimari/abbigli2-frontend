import React, { Component, PropTypes } from 'react'

import './index.styl'

import { messagePopup } from 'ducks/Popup'
import { sendPrivateMessage } from 'ducks/Dialogs'

import { __t } from './../../i18n/translator';

const textAreaSucces = {
  border: '1px solid #90a4ae'
};

const textAreaError = {
  border: '1px solid red'
};

const PRIVATE_MESSAGE = 'private message'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messageError: false,
    };
  }

  onUpdate(e) {
    this.setState({
      message: e.target.value,
      messageError: false
    });
  }


  render() {
    const { userId, userName, errorMessage, dispatch } = this.props

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div className="popup" id="message-send-popup">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={ ()=>{ dispatch(messagePopup(false)) } }
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
            </svg>
          <div className="popup-title">{__t('message.to')} { userName }</div>
          <form className="popup-form">
            <div className="popup-form__field">
              <div className="textarea-wrap">
                <textarea id="message"
                  style={ this.state.messageError ? textAreaError : textAreaSucces }
                  value={this.state.message}
                  onChange={(e)=>this.onUpdate(e)} className="textarea"></textarea>
              </div>
            </div>
            <div className="buttons-wrap">
              <button className="default-button" type="button" onClick={ ()=>{ this.state.message ? (dispatch(sendPrivateMessage(userId, this.state.message)))  : this.setState({ messageError: true }) } }>
                {__t('send.message')}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}
