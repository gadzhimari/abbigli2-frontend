import React, { Component, PropTypes } from 'react';

import { statusPopup } from 'ducks/Popup';

import './index.styl'

export default class Login extends Component {

  render() {
    const { errorMessage, dispatch } = this.props

    return (
      <div className="popup-wrap" id="sendStatus" style={{ display: 'block' }}>
        <div className="popup" id="message-send-popup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="popup-close icon"
            onClick={ ()=>{ dispatch(statusPopup(false)) } }
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z"/>
          </svg>
          <div className="popup-title">Message have been sent</div>
          <form className="popup-form">
            <div className="buttons-wrap">
              <button className="default-button" type="button" onClick={ ()=>{ dispatch(statusPopup(false)) } }>Close</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
