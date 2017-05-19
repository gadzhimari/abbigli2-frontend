import { getJsonFromStorage } from 'utils/functions';
import { setFetchingStatus, setError, handleSucces } from './common';

import { closePopup } from 'ducks/Popup/actions';
import fetchMe from './fetchMe';

import { API_URL } from 'config';

const setPassword = (creds) => {
  const token = getJsonFromStorage('id_token');

  const config = {
    method: 'POST',
    body: creds,
    headers: {},
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(setFetchingStatus());

    fetch(`${API_URL}my-profile/set-password/`, config)
      .then(res => res.json().then(detail => ({ detail, response: res }))
      .then(({ detail, response }) => {
        if (!response.ok) {
          dispatch(setError('password', detail));

          return;
        }

        dispatch(handleSucces({
          resetStage: 'login',
          registerStage: 'register',
        }));
        dispatch(closePopup());
        dispatch(fetchMe());
      }));
  };
};

export default setPassword;
