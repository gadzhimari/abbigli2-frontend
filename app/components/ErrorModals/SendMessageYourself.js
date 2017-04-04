import React, { Component} from 'react';

import './index.styl';

import { sendMessageYourselfPopup } from 'ducks/Popup';

import { __t } from './../../i18n/translator';

export default class Login extends Component {
  render() {
    const { errorMessage, dispatch } = this.props;

    return (
      <div class="popup-wrap" id="dialog-remove-popup" style="display: block">
          <div class="popup">
              <svg class="popup-close icon" onClick={ ()=>{ dispatch(sendMessageYourselfPopup(false)) } }>
                <use href="#close"></use>
              </svg>
              <div class="popup-title">
                {__t('Error')}
              </div>
              <p>
                {__t('Error.message.yourself')}
              </p>
              <div class="buttons-wrap">
                <button
                  id="registration"
                  class="cancel-button"
                  type="button"
                  onClick={ ()=>{ dispatch(sendMessageYourselfPopup(false)) } }
                >
                  {__t('Cancel')}
                </button>
              </div>
          </div>
      </div>
    )
  }
}
