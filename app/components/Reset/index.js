import React, { Component, PropTypes } from 'react';

import { registerPopup, resetPopup } from 'ducks/Popup';
import { __t } from './../../i18n/translator';

import './index.styl';


export default class Login extends Component {
  handleClick = () => {
    const creds = {
      username: this.username.value.trim(),
    };

    this.props.onResetClick(creds);
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(resetPopup(false));
  }

  signUpOpen = () => {
    const { dispatch } = this.props;

    dispatch(dispatch(resetPopup(false)), dispatch(registerPopup(true)));
  }

  render() {
    return (
      <div className="popup-wrap" id="password-reset-popup" style={{ display: 'block' }}>
        <div className="popup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="popup-close icon"
            onClick={this.closePopup}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          <div className="popup-title">
            {__t('recover.your.password')}
          </div>
          <div className="popup-notice">
            {__t('Via your phone')}
          </div>
          <form className="popup-form">
            <div className="popup-form__field">
              <div className="input-wrap">
                <input
                  id="phone-number"
                  ref={username => (this.username = username)}
                  placeholder={__t('phone.number.with.country')}
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <div className="buttons-wrap">
              <button
                className="default-button"
                type="button"
                onClick={this.handleClick}
              >
                {__t('Recover.your.password')}
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={this.signUpOpen}
              >
                {__t('Sign Up')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
};
