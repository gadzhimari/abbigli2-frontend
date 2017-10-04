import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';
import { registerConfirm } from './';

import { Auth } from 'API';

const regWithoutSideEffects = creds => Auth.signUp({ phone: creds.contact });

const registration = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signUp({ phone: creds.phoneNumber })
    .then((res) => {
      dispatch(handleSucces({
        registerStage: 'confirm',
        phone: res.data.phone,
      }));

      dispatch(openPopup('confirmPopup', {
        callback: data => dispatch(registerConfirm(data)),
        previousPopup: 'registerPopup',
        contact: res.data.phone,
        againRequest: regWithoutSideEffects,
      }));
    })
    .catch((error) => {
      dispatch(setError('registration', error.response.data));
    });
};


export default registration;
