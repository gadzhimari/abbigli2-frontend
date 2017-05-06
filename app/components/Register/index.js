import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { SocialLogin, FetchingButton } from 'components';

import { loginPopup, registerPopup } from 'ducks/Popup';
import { __t } from './../../i18n/translator';

import './index.styl';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      number: '',
      checkRules: false,
      codeValue: props.currentCountry || undefined,
      selfErrors: null,
    };
  }

  numberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  }

  checkRules = (e) => {
    this.setState({
      checkRules: e.target.checked,
      errorText: '',
    });
  }

  handleOptions = (val) => {
    this.setState({
      codeValue: val.value,
      selfErrors: null,
    });
  }

  handleClick = () => {
    const {
      errorMessage,
      dispatch,
      onRegisterClick,
    } = this.props;
    const code = this.state.codeValue
      ? this.state.codeValue.split('--')[0]
      : null;
    const number = this.number;

    if (!code) {
      this.setState({
        selfErrors: {
          country: 'You must choose your country',
        },
      });
    } else {
      const creds = {
        phoneNumber: `${code}${number.value.trim()}`,
      };

      onRegisterClick(creds);
    }
  }

  handleRegister = () => {
    const { checkRules } = this.state;

    if (checkRules) {
      this.handleClick();
    } else {
      this.setState({
        errorText: 'You should agree Terms of use of the resource'
      });
    }
  }

  openSignIn = () => {
    const { dispatch } = this.props;

    dispatch(dispatch(registerPopup(false)), dispatch(loginPopup(true)));
  }

  closePopup = () => {
    const { dispatch } = this.props;

    dispatch(registerPopup(false));
  }

  render() {
    const { errorMessage, codes, isFetching, errors } = this.props;
    const { codeValue, selfErrors } = this.state;

    return (
      <div className="popup-wrap" id="register-popup" style={{ display: 'block' }}>
        <div className="popup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="popup-close icon"
            onClick={this.closePopup}
          >
            <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
          </svg>
          <div className="popup-title">{__t('Sign Up')}</div>
          <div className="popup-notice">{__t('with social networks')}</div>

          <SocialLogin />

          <div className="popup-notice">{__t('or add your phone number')}</div>
          <form className="popup-form">
            <div className="popup-form__field">
              <div className="select-code-phone">
                <label className="popup-form__label">{__t('Telephone')}</label>
                <div>
                  <Select
                    onChange={this.handleOptions}
                    matchPos="start"
                    options={codes}
                    value={codeValue}
                    placeholder={__t('Choose your country')}
                    clearable={false}
                  />
                </div>
              </div>
              <div className="input-wrap phone">
                <input
                  className="input"
                  ref={number => (this.number = number)}
                  id="phone"
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={this.numberChange}
                  placeholder={__t('Phone number without a country code')}
                />
              </div>
              {
                selfErrors && selfErrors.country
                &&
                <div className="login__form-error">
                  {selfErrors.country}
                </div>
              }
              {
                errors && errors.phone
                &&
                <div className="login__form-error">
                  {errors.phone}
                </div>
              }
            </div>
            <div className="checkbox-wrap">
              <input
                className="checkbox"
                onChange={this.checkRules}
                id="iAgree"
                type="checkbox"
                name="check"
                value={this.state.checkRules}
              />
              <label className="checkbox-label" htmlFor="iAgree">
                {__t('I agree')} {' '}
                <a className="checkbox-label__link" href="/page/agreement">
                  {__t('Terms of use of the resource')}
                </a>
              </label>
              <div className="login__form-error">
                {this.state.errorText}
              </div>
            </div>
            <div className="buttons-wrap">
              <FetchingButton
                className="default-button"
                type="button"
                onClick={this.handleRegister}
                isFetching={isFetching}
              >
                {__t('Sign Up')}
              </FetchingButton>
              <button
                className="cancel-button"
                type="button"
                onClick={this.openSignIn}
              >
                {__t('Sign In')}
              </button>
            </div>
          </form>
        </div>
      </div >

    );
  }
}

Login.propTypes = {
  errorMessage: PropTypes.string,
};
