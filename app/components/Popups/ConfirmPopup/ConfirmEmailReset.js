import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { resetConfirm } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';

import ConfirmPopup from './ConfirmPopup';

import { __t } from '../../../i18n/translator';

class ConfirmEmailReset extends ConfirmPopup {
  title = __t('Confirm the password reset');
  buttonText = __t('Send code');
  description = __t("We've sent an email with an confirmation code. Click the link in the email to reset your password\n.If you don't see the email, check other places it might be, like your junk, spam, or other folders.")
  showConfirmCode = false;

  handleBackClick = () => {
    const { dispatch, options } = this.props;

    dispatch(openPopup('resetPopup', {
      contact: options.contact,
    }));
  }
}

const mapStateToProps = state => ({
  isFetching: state.Auth.isFetching,
  errors: state.Auth.errors,
  number: state.Auth.number,
});

const mapDispatchToProps = dispatch => ({
  sendForm: credentials => dispatch(resetConfirm(credentials)),
});

const enhance = compose(connect(mapStateToProps,
  mapDispatchToProps), popupHOC);

export default enhance(ConfirmEmailReset);
