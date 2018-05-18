import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { React, Component, Type } from '../../../components-lib/__base';
import { Button } from '../../../components-lib';
import IconClose from '../../../icons/close';

import { openPopup } from '../../../ducks/Popup/actions';

import { __t } from '../../../i18n/translator';

class ConfirmRegistration extends Component {
  static propTypes = {
    dispatch: Type.func.isRequired,
    closePopup: Type.func.isRequired,
    isFetching: Type.bool.isRequired,
    errors: Type.oneOfType([Type.object, Type.any]),
  };

  handleBackClick = () => {
    const { dispatch } = this.props;

    dispatch(openPopup('signUpPopup'));
  }

  render() {
    const { closePopup } = this.props;

    return (
      <div className="popup-wrap" id="sendMessage">
        <div
          className="popup mobile-search__popup reset-password-popup"
        >
          <div className="register-popup__title">
            {__t('Confirm registration')}
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
            <p
              className="register-popup__text"
            >
              {__t("We've sent an email with an confirmation code. Click the link in the email to confirm your registration.\nIf you don't see the email, check other places it might be, like your junk, spam, or other folders.")}
            </p>
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

const mapStateToProps = state => ({
  isFetching: state.Auth.isFetching,
  errors: state.Auth.errors,
});

const enhance = compose(connect(mapStateToProps), popupHOC);

export default enhance(ConfirmRegistration);
