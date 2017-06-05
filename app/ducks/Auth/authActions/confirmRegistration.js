import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';

import { API_URL } from 'config';

const confirmRegistration = (creds) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: creds.phone, code: creds.code }),
  };

  return (dispatch) => {
    dispatch(setFetchingStatus());

    return fetch(`${API_URL}signup/confirm/`, config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          dispatch(setError('confirm', user));

          return;
        }

        document.cookie = `id_token=${user.token}`;

        dispatch(handleSucces({
          registerStage: 'setPassword',
        }));
        dispatch(openPopup('passwordPopup'));
      });
  };
};


export default confirmRegistration;
