import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';
import { resetConfirm } from './';

import { Auth } from 'API';

const resetWithoutSideEffects = (creds) => {
  const formData = new FormData();
  formData.append('contact', creds.contact);

  return Auth.resetPassword(formData);
};

const reset = (creds) => {
  const formData = new FormData();
  formData.append('contact', creds.contact);

  return (dispatch) => {
    dispatch(setFetchingStatus());

    return Auth.resetPassword(formData)
      .then((res) => {
        dispatch(handleSucces({
          loginStage: 'confirm',
        }));

        dispatch(openPopup('confirmPopup', {
          callback: data => dispatch(resetConfirm(data)),
          previousPopup: 'resetPopup',
          contact: res.data.contact,
          againRequest: resetWithoutSideEffects,
        }));
      })
      .catch(error => dispatch(setError('reset', error.response.data)));
  };
};

export default reset;
