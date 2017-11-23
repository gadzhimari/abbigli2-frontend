import { connect } from 'react-redux';

import { registerConfirm } from 'ducks/Auth/authActions';
import { openPopup } from 'ducks/Popup/actions';

import ConfirmPopup from './ConfirmPopup';

import { __t } from '../../../i18n/translator';

class ConfirmRegistration extends ConfirmPopup {
  title = __t('Confirm registration');
  buttonText = __t('Send code');

  goBack = () => {
    const { dispatch, options } = this.props;

    dispatch(openPopup('registerPopup', {
      contact: options.contact,
    }));
  }
}

const mapState = state => ({
  isFetching: state.Auth.isFetching,
  errors: state.Auth.errors,
  number: state.Auth.number,
});

const mapDispatch = dispatch => ({
  sendForm: creds => dispatch(registerConfirm(creds)),
});

export default connect(mapState, mapDispatch)(ConfirmRegistration);
