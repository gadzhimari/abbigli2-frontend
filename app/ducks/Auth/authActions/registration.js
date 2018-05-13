import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from '../../../ducks/Popup/actions';

import { Auth } from '../../../api';

const regWithoutSideEffects = creds => Auth.signUp({ phone: creds.contact });

const registration = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signUp(creds)
    .then((res) => {
      dispatch(handleSucces({
        signUpStage: 'confirm',
        email: res.data.email,
      }));

      // dispatch(openPopup('confirmRegistration', {
      //   contact: res.data.phone,
      //   againRequest: regWithoutSideEffects,
      // }));
    })
    .catch((error) => {
      dispatch(setError('registration', error.response.data));
    });
};


export default registration;
