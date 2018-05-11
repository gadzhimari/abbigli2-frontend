import { setFetchingStatus, setError, handleSucces } from './common';

import { closePopup } from 'ducks/Popup/actions';
import fetchMe from './fetchMe';

import { Auth } from 'API';

const setPassword = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  Auth.setPassword(creds)
    .then(() => {
      dispatch(handleSucces({ resetStage: 'login', signUpStage: 'signUp' }));
      dispatch(closePopup());
      dispatch(fetchMe());
    })
    .catch(error => dispatch(setError('password', error.response.data)));
};

export default setPassword;
