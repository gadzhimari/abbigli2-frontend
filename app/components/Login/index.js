import React, { Component, PropTypes } from 'react';

import { SocialLogin, FetchingButton } from 'components';

import { loginPopup, registerPopup, resetPopup } from 'ducks/Popup';
import { __t } from './../../i18n/translator';

import './index.styl';

export default class Login extends Component {
  handleClick = () => {
    const phone = this.phone;
    const password = this.password;
    const creds = {
      username: phone.value.trim(),
      password: password.value.trim(),
    };

    this.props.onLoginClick(creds);
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(loginPopup(false));
  }

  render() {
    const {
      errors,
      dispatch,
      isFetching,
    } = this.props;

    return (
      <div className="popup-wrap" id="login-popup" style={{ display: 'block' }}>
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
            {__t('Log In')}
          </div>
          <div className="popup-notice">
            {__t('with social networks')}
          </div>
          <SocialLogin />
          <div className="popup-notice">{__t('or autorize')}</div>
          <div className="popup-form">
            {
              errors && errors.non_field_errors
              &&
              <div className="login__form-error login__form-error--top">
                {errors.non_field_errors}
              </div>
            }
            <div className="popup-form__field">
              <label
                className="popup-form__label"
                htmlFor="phone"
              >
                {__t('Telephone')}
              </label>
              <div className="input-wrap">
                <input
                  id="phone"
                  className="input"
                  type="text"
                  placeholder={__t('Example: +10000000000')}
                  ref={phone => (this.phone = phone)}
                />
              </div>
              {
                errors && errors.username
                &&
                <div className="login__form-error">
                  {errors.username}
                </div>
              }
            </div>
            <div className="popup-form__field">
              <label
                className="popup-form__label"
                htmlFor="password"
              >
                {__t('Password')}
              </label>
              <div className="input-wrap">
                <input
                  id="password"
                  className="input"
                  type="password"
                  ref={password => (this.password = password)}
                />
              </div>
              {
                errors && errors.password
                &&
                <div className="login__form-error">
                  {errors.password}
                </div>
              }
            </div>
            <div className="buttons-wrap">
              <FetchingButton
                className="default-button"
                type="button"
                onClick={this.handleClick}
                isFetching={isFetching}
              >
                {__t('Log In')}
              </FetchingButton>
              <button
                className="cancel-button"
                type="submit"
                onClick={() => {
                  dispatch(dispatch(registerPopup(true)), dispatch(loginPopup(false)));
                }}
              >
                {__t('Sign Up')}
              </button>
              <br />
              <a
                className="password-recovery"
                onClick={() => {
                  dispatch(dispatch(loginPopup(false)), dispatch(resetPopup(true)));
                }}
              >
                {__t('Forgot your password?')}
              </a></div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
