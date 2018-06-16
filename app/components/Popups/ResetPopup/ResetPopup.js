import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import IconClose from '../../../icons/close';

import { ErrorInput } from '../../../components/Inputs';

import { reset } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';
import { __t } from '../../../i18n/translator';

import './ResetPopup.less';

class ResetPopup extends Component {
  static propTypes = {
    dispatch: Type.func.isRequired,
    closePopup: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  state = {
    contact: this.props.options.contact || '',
  };

  validateForm = () => {
    const { contact } = this.state;

    return contact.length > 0;
  }

  handleChange = ({ target }) => {
    this.setState({
      contact: target.value.trim(),
    });
  }

  handleSubmit = () => {
    this.props.dispatch(reset(this.state));
  }

  handleBackClick = () => {
    this.props.dispatch(openPopup('signInPopup'));
  }

  render() {
    const { isFetching, errors, closePopup } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage">
        <div
          className="popup mobile-search__popup reset-password-popup"
        >
          <div className="register-popup__title">
            {__t('Reset your password')}
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
            <div className="register-popup__form-field">
              <ErrorInput
                className="input"
                value={this.state.contact}
                onChange={this.handleChange}
                disabled={isFetching}
                placeholder={__t('Email or phone')}
                errors={errors.contact}
                errorClass="login__form-error"
              />
            </div>
            <Button
              className="register-popup__fetch-button-old"
              onClick={this.handleSubmit}
              isFetching={isFetching}
              text={__t('Continue')}
              disabled={!this.validateForm()}
              fullWidth
            />
            <Button
              color="secondary"
              className="register-popup__button-back"
              onClick={this.handleBackClick}
              text={__t('Back')}
              fullWidth
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

export default enhance(ResetPopup);
