import React, { Component, PropTypes } from 'react';

import Popup from './CommonPopup';
import { SocialLogin, FetchingButton } from 'components';

import { __t } from '../../i18n/translator';

import './LoginPopup.styl';

class LoginPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
    };
  }

  render() {
    const { closePopup, isFetching } = this.props;

    return (
      <Popup
        closePopup={closePopup}
        title={__t('Log In')}
      >
        <div className="popup-notice">
          {__t('with social networks')}
        </div>
        <SocialLogin />
        <div className="popup-notice">
          {__t('or autorize')}
        </div>
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
      </Popup>
    );
  }
}

LoginPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default LoginPopup;
