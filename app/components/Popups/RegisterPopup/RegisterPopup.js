import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import Popup from '../CommonPopup';
import { SocialLogin, FetchingButton } from 'components';

import { registerUser } from 'ducks/Auth';
import { openPopup } from 'ducks/Popup';
import { __t } from '../../../i18n/translator';

import './RegisterPopup.styl';

class RegisterPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      checkRules: false,
      codeValue: props.currentCountry || undefined,
      selfErrors: null,
    };
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
    const {
      dispatch,
    } = this.props;
    const code = this.state.codeValue
      ? this.state.codeValue.split('--')[0]
      : null;
    const number = this.state.number;

    if (!code) {
      this.setState({
        selfErrors: {
          country: 'You must choose your country',
        },
      });
    } else {
      const creds = {
        phoneNumber: `${code}${number}`,
      };

      dispatch(registerUser(creds));
    }
  }

  handleRegister = () => {
    const { checkRules } = this.state;

    if (checkRules) {
      this.handleClick();
    } else {
      this.setState({
        errorText: 'You should agree Terms of use of the resource',
      });
    }
  }

  openSignIn = () => this.props.dispatch(openPopup('loginPopup'))

  render() {
    const { codes, isFetching, errors, closePopup } = this.props;
    const { codeValue, selfErrors } = this.state;

    return (
      <Popup
        title={__t('Sign Up')}
        closePopup={closePopup}
      >
        <div className="popup-notice">
          {__t('with social networks')}
        </div>

        <SocialLogin />

        <div className="popup-notice">
          {__t('or add your phone number')}
        </div>
        <form className="popup-form">
          <div className="popup-form__field">
            <div className="select-code-phone">
              <label className="popup-form__label">
                {__t('Telephone')}
              </label>
              <div>
                <Select
                  onChange={this.handleOptions}
                  matchPos="start"
                  options={codes}
                  value={codeValue}
                  placeholder="Choose your country"
                  clearable={false}
                />
              </div>
            </div>
            <div className="input-wrap phone">
              <input
                className="input"
                id="phone"
                type="text"
                value={this.state.number}
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
              {__t('I agree')}
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
      </Popup>
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
  codes: Settings.geo,
  currentCountry: Settings.currentCountry,
});

export default connect(mapStateToProps)(RegisterPopup);
