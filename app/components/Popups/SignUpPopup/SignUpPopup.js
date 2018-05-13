import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Fragment, Type } from '../../../components-lib/__base';
import { Button, Link, Checkbox } from '../../../components-lib';
import { ErrorInput } from '../../../components/Inputs';
import { SocialLogin } from '../../../components';
import IconClose from '../../../icons/close';

import { registration } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';

import { gaSendClickEvent } from '../../../lib/analitics';
import { __t } from '../../../i18n/translator';

import './SignUpPopup.less';

class SignUpPopup extends Component {
  static propTypes = {
    dispatch: Type.func.isRequired,
    closePopup: Type.func.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  state = {
    email: '',
    password: '',
    tosCheckbox: true,
  };

  onSendGaEvent = (e, { name }) => {
    gaSendClickEvent('signin_up', name);
  }

  validateForm = () => {
    const { email, password, tosCheckbox } = this.state;

    return email.length > 0 && password.length > 0 && tosCheckbox;
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSignUp = (...attr) => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    this.onSendGaEvent(...attr);

    const credentials = {
      email,
      password,
    };

    dispatch(registration(credentials));
  }

  handleSignIn = () => {
    this.props.dispatch(openPopup('signInPopup'));
  }

  render() {
    const { isFetching, errors, closePopup } = this.props;
    const { email, password, tosCheckbox } = this.state;

    return (
      <div className="popup-wrap" id="sendMessage">
        <div
          className="popup mobile-search__popup register-popup"
        >
          <Button
            view="icon"
            className="register-popup__close"
            onClick={closePopup}
            aria-label={__t('Close')}
            icon={<IconClose
              size="xs"
              color="gray-500"
            />}
          />
          <div className="register-popup__title">
            {__t('Sign Up')}
          </div>
          <div className="register-popup__body">
            <form className="register-popup__form">
              <ErrorInput
                className="input"
                value={email}
                onChange={this.handleChange}
                disabled={isFetching}
                errors={errors.email}
                errorClass="login__form-error"
                id="email"
                name="email"
                type="email"
                wrapperClass="register-popup__form-field"
                wrapperErrorClass="error"
                labelRequired
                label="Email"
                autoComplete="on"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                autoFocus
              />
              <ErrorInput
                className="input"
                value={password}
                onChange={this.handleChange}
                disabled={isFetching}
                errors={errors.password}
                errorClass="login__form-error"
                id="password"
                name="password"
                type="password"
                wrapperClass="register-popup__form-field"
                wrapperErrorClass="error"
                labelRequired
                label={__t('Password')}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <div className="register-popup__terms">
                <Checkbox
                  checked={tosCheckbox}
                  onChange={this.handleChange}
                  name="tosCheckbox"
                  size="s"
                  text={
                    <Fragment>
                      {__t('I agree with')}
                      {__t(' ')}
                      <Link
                        size="s"
                        to="/page/agreement"
                        text={__t('terms of use of the resource')}
                      />
                    </Fragment>
                  }
                />
              </div>

              <Button
                onClick={this.handleSignUp}
                isFetching={isFetching}
                name="join"
                text={__t('Join')}
                disabled={!this.validateForm()}
                fullWidth
              />

            </form>
            <div className="register-popup__social">
              <SocialLogin
                onButtonClick={this.onSendGaEvent}
              />
              <div className="register-popup__notice">
                {__t('Sign in via social network allows your friends to find you on Abbigli')}
              </div>
              <div className="register-popup__social-footer">
                <span
                  className="register-popup__account"
                >
                  {__t('Do you already have an account on Abbigli?')}
                </span>
                <Button
                  view="link"
                  size="l"
                  onClick={this.handleSignIn}
                  text={__t('Sign In')}
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

const enhance = compose(connect(mapStateToProps), popupHOC);

export default enhance(SignUpPopup);
