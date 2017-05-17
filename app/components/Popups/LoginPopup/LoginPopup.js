import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Popup from '../CommonPopup';
import { SocialLogin, FetchingButton } from 'components';

import { loginUser } from 'ducks/Auth';
import { openPopup } from 'ducks/Popup';
import { __t } from '../../../i18n/translator';

import './LoginPopup.styl';

class LoginPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
    };
  }

  onChangePhone = ({ target }) => this.setState({
    phone: target.value.trim(),
  })

  onChangePassword = ({ target }) => this.setState({
    password: target.value.trim(),
  })

  onLogIn = () => this.props.dispatch(loginUser({
    username: this.state.phone,
    password: this.state.password,
  }))

  openRegister = () => this.props.dispatch(openPopup('registerPopup'))

  openReset = () => this.props.dispatch(openPopup('resetPopup'))

  render() {
    const { closePopup, isFetching, errors } = this.props;

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
                onChange={this.onChangePhone}
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
                onChange={this.onChangePassword}
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
              onClick={this.onLogIn}
              isFetching={isFetching}
            >
              {__t('Log In')}
            </FetchingButton>
            <button
              className="cancel-button"
              type="submit"
              onClick={this.openRegister}
            >
              {__t('Sign Up')}
            </button>
            <br />
            <button
              className="password-recovery"
              onClick={this.openReset}
            >
              {__t('Forgot your password?')}
            </button>
          </div>
        </div>
      </Popup>
    );
  }
}

LoginPopup.propTypes = {
  closePopup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errors: PropTypes.oneOf(PropTypes.object, PropTypes.any),
};

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(LoginPopup);
