import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';
import { confirmReset } from './';

import { API_URL } from 'config';

const reset = (creds) => {
  const formData = new FormData();
  formData.append('username', creds.username);

  const config = {
    method: 'POST',
    body: formData,
  };

  return (dispatch) => {
    dispatch(setFetchingStatus());

    return fetch(`${API_URL}reset-password/`, config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          dispatch(setError('reset', user));

          return;
        }

        dispatch(handleSucces({
          loginStage: 'confirm',
          phone: user.username,
        }));

        dispatch(openPopup('confirmPopup', {
          callback: data => dispatch(confirmReset(data)),
          previousPopup: 'resetPopup',
        }));
      });
  };
};

export default reset;
