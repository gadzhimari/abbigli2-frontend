import { connect } from 'react-redux';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';

import { ErrorInput } from '../../../components/Inputs';
import { SocialLogin } from '../../../components';

import { login, stagedPopup } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';
import { __t } from '../../../i18n/translator';

import './LoginPopup.styl';

class LoginPopup extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    dispatch: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  state = {
    phone: '',
    password: '',
  };

  onChangePhone = ({ target }) => this.setState({
    phone: target.value.trim(),
  })

  onChangePassword = ({ target }) => this.setState({
    password: target.value.trim(),
  })

  onLogIn = () => this.props.dispatch(login({
    username: this.state.phone,
    password: this.state.password,
  }, this.props.closePopup))

  openRegister = () => this.props.dispatch(stagedPopup('register'))

  openReset = () => this.props.dispatch(openPopup('resetPopup'))

  render() {
    const { closePopup, isFetching, errors } = this.props;

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
              {__t('Log In')}
            </div>
          </header>

          <form className="register-popup__form">
            {
              errors && errors.non_field_errors
              &&
              <div className="login__form-error login__form-error--top">
                {errors.non_field_errors}
              </div>
            }
            <div className="register-popup__field">
              <label
                htmlFor="phone"
                className="register-popup__label"
              >
                {__t('Telephone')}
              </label>
              <ErrorInput
                id="phone"
                className="register-popup__input"
                type="text"
                placeholder={__t('Example: +10000000000')}
                onChange={this.onChangePhone}
                errors={errors.username}
                errorClass="login__form-error"
              />
            </div>
            <div className="register-popup__field">
              <label
                htmlFor="password"
                className="register-popup__label"
              >
                {__t('Password')}
              </label>
              <ErrorInput
                id="password"
                className="register-popup__input"
                type="password"
                onChange={this.onChangePassword}
                placeholder={__t('Type password')}
                errors={errors.password}
                errorClass="login__form-error"
              />
            </div>
            <div className="register-popup__terms">
              <a
                className="register-popup__link register-popup__link--big"
                onClick={this.openReset}
              >
                {__t('Forgot your password?')}
              </a>
            </div>

            <Button
              className="register-popup__fetch-button-new"
              onClick={this.onLogIn}
              isFetching={isFetching}
              text={__t('Log In')}
            />
            <div className="register-popup__notice">
              {__t('Or with social networks')}
            </div>

            <SocialLogin
              className="register-popup__social"
            />

            <a
              className="register-popup__link register-popup__link--promo"
              onClick={this.openRegister}
            >
              {__t('Sign Up')}
            </a>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(LoginPopup);
