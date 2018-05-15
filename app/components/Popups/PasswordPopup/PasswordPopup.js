import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import IconClose from '../../../icons/close';

import { ErrorInput } from '../../../components/Inputs';

import { setPassword } from '../../../ducks/Auth/authActions';

import { __t } from '../../../i18n/translator';

import './PasswordPopup.less';

class PasswordPopup extends Component {
  static propTypes = {
    closePopup: Type.func.isRequired,
    dispatch: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  state = {
    password: '',
    passwordConfirm: '',
  };

  validateForm = () => {
    const { password, passwordConfirm } = this.state;

    return password.length > 0 && passwordConfirm.length > 0;
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value.trim(),
    });
  }

  handleSubmit = () => {
    const { password, passwordConfirm } = this.state;
    const formData = new FormData();

    formData.append('new_password', password);
    formData.append('re_new_password', passwordConfirm);

    this.props.dispatch(setPassword(formData));
  }

  render() {
    const { closePopup, isFetching, errors } = this.props;
    const { password, passwordConfirm } = this.state;

    return (
      <div className="popup-wrap" id="sendMessage">
        <div
          className="popup mobile-search__popup reset-popup"
        >
          <div className="register-popup__title">
            {__t('Set up your password')}
          </div>
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
          <form className="register-popup__form">
            <div className="register-popup__field">
              <ErrorInput
                className="input"
                value={password}
                onChange={this.handleChange}
                disabled={isFetching}
                placeholder={__t('New password')}
                errors={errors.new_password}
                errorClass="login__form-error"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                aria-label={__t('Enter new password')}
              />
            </div>
            <div className="register-popup__field">
              <ErrorInput
                className="input"
                value={passwordConfirm}
                onChange={this.handleChange}
                disabled={isFetching}
                placeholder={__t('Re-enter new password')}
                errors={errors.re_new_password}
                errorClass="login__form-error"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                aria-label={__t('Re-enter new password')}
              />
            </div>
            <Button
              className="register-popup__fetch-button-new"
              onClick={this.handleSubmit}
              isFetching={isFetching}
              text={__t('Set password')}
              disabled={!this.validateForm()}
            />
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

const enhance = compose(connect(mapStateToProps), popupHOC);

export default enhance(PasswordPopup);
