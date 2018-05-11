import { connect } from 'react-redux';

import { registerConfirm } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';

import ConfirmPopup from './ConfirmPopup';

import { __t } from '../../../i18n/translator';

class ConfirmRegistration extends ConfirmPopup {
  title = __t('Confirm registration');
  buttonText = __t('Send code');

  goBack = () => {
    const { dispatch, options } = this.props;

    dispatch(openPopup('signUpPopup', {
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
  sendForm: creds => dispatch(registerConfirm(creds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegistration);
