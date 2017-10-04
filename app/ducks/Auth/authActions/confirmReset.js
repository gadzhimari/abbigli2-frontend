import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';

import { Auth } from 'API';

const confirmReset = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  Auth.resetPasswordConfirm(creds)
    .then((res) => {
      document.cookie = `id_token=${res.data.token}`;

      dispatch(handleSucces({ resetStage: 'password' }));
      dispatch(openPopup('passwordPopup'));
    })
    .catch(error => dispatch(setError('confirmReset', error.response.data)));
};

export default confirmReset;
