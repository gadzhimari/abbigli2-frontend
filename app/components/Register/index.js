import React, { Component, PropTypes } from 'react'

import { FacebookLogin } from 'react-facebook-login-component';

import './index.styl'

import Select from 'react-select';

import 'react-select/dist/react-select.css';

import { loginPopup, registerPopup, confirmPopup } from 'ducks/Popup'

import countries from './data'

import { __t } from './../../i18n/translator';

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
    }
  }

  _facebookLogin(e) {

    var url = 'https://facebook.com/dialog/oauth?client_id=1738998542989048&redirect_uri=https://abbigli.com/?provider=fb&scope=public_profile,email'
    e.preventDefault();

    var win = window.open(url, "_self");
    if (win) {
      win.focus();
    } else {
      //Broswer has blocked it
      alert('Please allow popups for this site');
    }

  }

  _vkLogin(e) {

    var url = 'https://oauth.vk.com/authorize?client_id=5225447&redirect_uri=http://localhost:3000/?provider=vk&display=page&scope=email'
    e.preventDefault();

    var win = window.open(url, "_self");
    if (win) {
      win.focus();
    } else {
      //Broswer has blocked it
      alert('Please allow popups for this site');
    }

  }

  _googlePlus(e) {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=152791861668-te59cn5d3n0tpefmqe5av5egnr1ucvs4.apps.googleusercontent.com&response_type=code&scope=openid%20email&redirect_uri=https://abbigli.com/?provider=google';
    e.preventDefault();

    var win = window.open(url, "_self");
    if (win) {
      win.focus();
    } else {
      //Broswer has blocked it
      alert('Please allow popups for this site');
    }

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
          <div className="buttons-social">
            <a className="button-social facebook" onClick={(e) => (this._facebookLogin(e))}>
              <div className="icon-wrap">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
                  <path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
                    c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"/>
</svg>
              </div>
              Facebook
            </a>
            <a className="button-social google-plus" onClick={(e) => (this._googlePlus(e))}>
              <div className="icon-wrap">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.146 14">
                  <path d="M7.034,5.998c-0.002,0.795,0,1.591,0.003,2.386c1.343,0.042,2.685,0.022,4.026,0.042
                    c-0.593,2.96-4.639,3.917-6.775,1.986c-2.2-1.693-2.096-5.411,0.19-6.984C6.08,2.157,8.351,2.471,9.952,3.572
		c0.626-0.579,1.215-1.197,1.78-1.839c-1.328-1.056-2.959-1.808-4.698-1.727C3.411-0.115,0.079,3.044,0.019,6.649
		c-0.231,2.947,1.718,5.839,4.469,6.882c2.741,1.049,6.253,0.335,8.001-2.116c1.157-1.547,1.406-3.539,1.27-5.411
		C11.516,5.988,9.277,5.991,7.034,5.998z M20.139,5.988c-0.004-0.666-0.007-1.333-0.014-1.999h-1.998
		c-0.005,0.665-0.014,1.329-0.016,1.999c-0.672,0.003-1.339,0.006-2.01,0.013v1.987c0.671,0.008,1.341,0.015,2.01,0.021
		c0.009,0.667,0.009,1.331,0.016,1.995h1.998c0.007-0.664,0.01-1.328,0.014-1.997C20.812,8,21.479,7.997,22.146,7.988V6.001
		C21.479,5.994,20.809,5.994,20.139,5.988z"/>
                      </svg>
              </div>
              Google Plus
            </a>
          </div>
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
