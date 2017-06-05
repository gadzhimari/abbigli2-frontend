import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';

import { API_URL } from 'config';

const confirmReset = (creds) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: creds.username, code: creds.code }),
  };

  return (dispatch) => {
    dispatch(setFetchingStatus());

    fetch(`${API_URL}reset-password/confirm/`, config)
      .then(res => res.json().then(detail => ({ detail, response: res }))
      .then(({ detail, response }) => {
        if (!response.ok) {
          dispatch(setError('confirmReset', detail));
  
          return;
        }

        document.cookie = `id_token=${detail.token}`;

        dispatch(handleSucces({
          resetStage: 'password',
        }));
        dispatch(openPopup('passwordPopup'));
      }));
  };
};

export default confirmReset;
