import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from '../../../ducks/Popup/actions';

import { Auth } from '../../../api';

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
        console.log('resetPassword ', res);
        const currentPopup = res.data.type === 'phone' ?
          'confirmPinReset' : 'confirmEmailReset';

        dispatch(openPopup(currentPopup, {
          contact: res.data.contact,
          againRequest: resetWithoutSideEffects,
        }));
      })
      .catch(error => dispatch(setError('reset', error.response.data)));
  };
};

export default reset;
