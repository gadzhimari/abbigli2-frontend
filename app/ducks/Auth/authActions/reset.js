import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';
import { resetConfirm } from './';

import { API_URL } from 'config';

const reset = (creds, mode) => {
  const formData = new FormData();
  formData.append(mode, creds[mode]);

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
          [mode]: user[mode],
        }));

        dispatch(openPopup('confirmPopup', {
          callback: data => dispatch(resetConfirm(data)),
          previousPopup: 'resetPopup',
          [mode]: user[mode],
          mode,
        }));
      });
  };
};

export default reset;
