import { connect } from 'react-redux';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import { ErrorInput } from '../../../components/Inputs';
import { SocialLogin } from '../../../components';
import IconClose from '../../../icons/close';

import { login, stagedPopup } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';
import { __t } from '../../../i18n/translator';

import './SignInPopup.less';

class SignInPopup extends Component {
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

  handleChangePassword = ({ target }) => {
    this.setState({
      password: target.value.trim(),
    });
  }

  handleSignIn = () => {
    this.props.dispatch(login({
      username: this.state.phone,
      password: this.state.password,
    }, this.props.closePopup));
  }

  handleSignUp = () => {
    this.props.dispatch(stagedPopup('signUp'));
  }

  handleReset = () => {
    this.props.dispatch(openPopup('resetPopup'));
  }

  render() {
    const { closePopup, isFetching, errors } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage" style={{ display: 'block' }}>
        <div
          className="popup mobile-search__popup register-popup"
        >
          <Button
            view="icon"
            className="register-popup__close"
            aria-label={__t('Close')}
            onClick={closePopup}
            icon={<IconClose
              size="xs"
              color="gray-500"
            />}
          />
          <div className="register-popup__title">
            {__t('Sign In')}
          </div>
          <div className="register-popup__body">
            <form className="register-popup__form">
              <ErrorInput
                className="input"
                value={this.state.login}
                onChange={this.handleChangeLogin}
                disabled={isFetching}
                errors={errors}
                errorClass="login__form-error"
                type="text"
                id="login"
                name="login"
                wrapperClass="register-popup__form-field"
                wrapperErrorClass="error"
                labelRequired
                label={__t('Email or phone')}
                autoComplete="on"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                autoFocus
              />
              <ErrorInput
                className="input"
                value={this.state.password}
                onChange={this.handleChangePassword}
                disabled={isFetching}
                errors={errors}
                errorClass="login__form-error"
                id="password"
                type="password"
                name="password"
                wrapperClass="register-popup__form-field"
                wrapperErrorClass="error"
                labelRequired
                label={__t('Password')}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <div className="register-popup__forgot">
                <Button
                  view="link"
                  size="s"
                  text={__t('Forgot your password?')}
                  onClick={this.handleReset}
                />
              </div>
              <Button
                onClick={this.handleSignIn}
                isFetching={isFetching}
                name="sign in"
                text={__t('Sign In')}
                fullWidth
              />
            </form>
            <div className="register-popup__social">
              <SocialLogin />
              <div className="register-popup__notice">
                {__t('Sign in via social network allows your friends to find you on Abbigli')}
              </div>
              <div className="register-popup__social-footer">
                <span
                  className="register-popup__account"
                >
                  {__t('Don\'t have an account on Abbigli?')}
                </span>
                <Button
                  view="link"
                  size="l"
                  onClick={this.handleSignUp}
                  text={__t('Sign Up')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => ({
  isFetching: Auth.isFetching,
  errors: Auth.errors,
});

export default connect(mapStateToProps)(SignInPopup);
