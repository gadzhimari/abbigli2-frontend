import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';

import { Auth } from 'API';

const confirmRegistration = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signUpConfirm({ phone: creds.contact, code: creds.code })
    .then((res) => {
      document.cookie = `id_token=${res.data.token}`;

      dispatch(handleSucces({ registerStage: 'setPassword' }));
      dispatch(openPopup('passwordPopup'));
    })
    .catch(error => dispatch(setError('confirm', error.response.data)));
};


export default confirmRegistration;
