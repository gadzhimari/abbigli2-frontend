import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';

import { resetConfirm } from '../../../ducks/Auth/authActions';
import { openPopup } from '../../../ducks/Popup/actions';

import ConfirmPopup from './ConfirmPopup';

import { __t } from '../../../i18n/translator';

class ConfirmPinReset extends ConfirmPopup {
  title = __t('Confirm the password reset');
  buttonText = __t('Send code');
  description = __t("We've sent an SMS with an confirmation code to your phone. Please enter the code below.")

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

export default enhance(ConfirmPinReset);
