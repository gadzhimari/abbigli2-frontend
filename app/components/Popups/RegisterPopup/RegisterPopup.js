import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SocialLogin, FetchingButton } from '../../../components';
import CountryItem from './CountryItem';

import { registration } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';

import { gaSendClickEvent } from '../../../lib/analitics';
import { __t } from '../../../i18n/translator';

import './RegisterPopup.styl';

class RegisterPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: (props.options.contact && props.options.contact.slice(2)) || '',
      checkRules: true,
      country: props.options.country || props.currentCountry || props.countres[0],
      selfErrors: null,
    };
  }

  onRegistrationClick = () => {
    const { checkRules } = this.state;

    gaSendClickEvent('signin_up', 'phone');

    if (checkRules) {
      this.handleClick();
    } else {
      this.setState({
        errorText: 'You should agree Terms of use of the resource',
      });
    }
  }

  onFbClick = () => {
    gaSendClickEvent('signin_up', 'FB');
  }

  onVkClick = () => {
    gaSendClickEvent('signin_up', 'VK');
  }

  numberChange = ({ target }) => this.setState({
    number: target.value.trim(),
  });

  checkRules = ({ target }) => this.setState({
    checkRules: target.checked,
    errorText: '',
  })

  handleOptions = val => this.setState({
    codeValue: val.value,
    selfErrors: null,
  });

  handleClick = () => {
    const { dispatch } = this.props;
    const { country, number } = this.state;

    const creds = {
      phoneNumber: `${country.phone}${number}`,
    };

    dispatch(registration(creds));
  }

  openChoseCountry = () => this.props
    .dispatch(openPopup('selectPopup', {
      title: 'Country',
      items: this.props.countres,
      filterField: 'name',
      ItemComponent: CountryItem,
      onClose: (options = {}) => this.props
        .dispatch(openPopup('registerPopup', options)),
      onClickItem: (options = {}) => this.props
        .dispatch(openPopup('registerPopup', options)),
    }));

  openSignIn = () => this.props.dispatch(openPopup('loginPopup'))

  render() {
    const { codes, isFetching, errors, closePopup } = this.props;
    const { selfErrors, country } = this.state;
    const value = country
      ? country.name
      : '';

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup register-popup"
        >
          <header className="mobile-search__header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14.031"
              className="popup-close icon"
              onClick={closePopup}
            >
              <path d="M14,1.414L12.59,0L7,5.602L1.41,0L0,1.414l5.589,5.602L0,12.618l1.41,1.413L7,8.428l5.59,5.604L14,12.618 L8.409,7.016L14,1.414z" />
            </svg>
            <div className="popup-title">
              {__t('Sign Up')}
            </div>
          </header>

          <form className="register-popup__form">
            <div className="register-popup__field">
              <label
                htmlFor="country"
                className="register-popup__label"
              >
                {__t('Country')}
                <span className="register-popup__label-require">
                  {' - '}
                  {__t('required')}
                </span>
              </label>

              <input
                className="register-popup__input"
                onClick={this.openChoseCountry}
                placeholder="Choose your country"
                value={value}
                id="country"
              />
            </div>
            <div className="register-popup__field">
              <label htmlFor="phone" className="register-popup__label">
                {__t('Telephone')}
              </label>

              <div className="register-popup__phone-wrap">
                <div className="register-popup__code">
                  {country && country.phone}
                </div>

                <input
                  className="register-popup__input register-popup__input--phone"
                  id="phone"
                  type="text"
                  value={this.state.number}
                  onChange={this.numberChange}
                  placeholder={__t('9099090900')}
                />
              </div>
              {
                selfErrors && selfErrors.country &&
                <div className="login__form-error">
                  {selfErrors.country}
                </div>
              }

              {
                errors && errors.phone &&
                <div className="login__form-error">
                  {errors.phone}
                </div>
              }
            </div>

            <div className="register-popup__terms">
              {__t('By registration you agree to the')}
              <a
                className="register-popup__link"
                href="/page/agreement"
              >
                {__t('terms of use of the resource')}
              </a>
            </div>

            <FetchingButton
              className="register-popup__fetch-button"
              type="button"
              onClick={this.onRegistrationClick}
              isFetching={isFetching}
            >
              {__t('Sign Up')}
            </FetchingButton>

            <div className="register-popup__notice">
              {__t('Or with social networks')}
            </div>

            <SocialLogin
              className="register-popup__social"
              onFbClick={this.onFbClick}
              onVkClick={this.onVkClick}
            />

            <a
              className="register-popup__link register-popup__link--big"
              onClick={this.openSignIn}
            >
              {__t('Sign In')}
            </a>
          </form>
        </div>
      </div>
    );
  }
}

RegisterPopup.propTypes = {
  errors: PropTypes.object,
  currentCountry: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

const mapStateToProps = ({ Auth, Settings }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
  countres: Settings.geo,
  currentCountry: Settings.currentCountry,
});

export default connect(mapStateToProps)(RegisterPopup);
