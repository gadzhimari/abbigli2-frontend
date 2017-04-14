import React, { Component, PropTypes } from 'react';

import { SocialLogin } from 'components';

import { loginPopup, registerPopup, confirmPopup } from 'ducks/Popup';
import countries from './data';
import { __t } from './../../i18n/translator';

import './index.styl';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      number: '',
      codes: [],
      checkRules: false,
      errorText: '',
      phoneCode: '+7',
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

  handleOptions = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      phoneCode: value[0]
    })
  }

  handleClick = () => {
    const { errorMessage, dispatch } = this.props;
    const code = this.state.phoneCode;
    const number = this.number;

    if (typeof code == "undefined" || number.value.trim().length == 0) {
      this.setState({
        errorText: 'Проверьте правильно введенных данных'
      });
    } else {
      const creds = { phoneNumber: this.code + number.value.trim() };

      localStorage.setItem('phoneNumber', this.code + number.value.trim());
      dispatch(dispatch(registerPopup(false)), dispatch(confirmPopup(true)));
      this.props.onRegisterClick(creds);
    }
  }

  render() {
    const { errorMessage, dispatch } = this.props

    var items = []
    countries.map((item, i) => {
      items.push(
        <option key={i} value={item.value}>{item.label}</option>
      )
    });

    return (
      <div className="popup-wrap" id="register-popup" style={{ display: 'block' }}>
        <div className="popup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14.031"
            className="popup-close icon"
            onClick={() => { dispatch(registerPopup(false)) }}
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
                <div className="select-wrap">
                  <select onChange={this.handleOptions} className="select">
                    {items}
                  </select>
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
                {__t('I agree')} <a className="checkbox-label__link" href="/page/agreement">
                  {__t('Terms of use of the resource')}
                </a></label>
            </div>
            <div className="label-err"><label>{this.state.errorText}</label></div>
            <div className="buttons-wrap">
              <button
                className="default-button"
                type="button"
                onClick={(event) => { this.state.checkRules ? (this.handleClick(event)) : this.setState({ errorText: 'You should agree Terms of use of the resource' }) }}
              >
                {__t('Sign Up')}
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={() => { dispatch(dispatch(registerPopup(false)), dispatch(loginPopup(true))) }}
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
  errorMessage: PropTypes.string
}
