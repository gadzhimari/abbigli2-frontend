import { connect } from 'react-redux';

import { resetConfirm } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';

import ConfirmPopup from './ConfirmPopup';

import { __t } from '../../../i18n/translator';

class ConfirmPassword extends ConfirmPopup {
  title = __t('Confirm the password reset');
  buttonText = __t('Send code');

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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);
