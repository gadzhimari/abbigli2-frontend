import { setJsonToStorage } from 'utils/functions';
import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from 'ducks/Popup/actions';
import { confirmRegistration } from './';

import { API_URL } from 'config';

const registration = (creds) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: creds.phoneNumber }),
  };

  return (dispatch) => {
    dispatch(setFetchingStatus());

    return fetch(`${API_URL}signup/`, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          throw new Error(JSON.stringify(user));
        }

        dispatch(handleSucces({
          registerStage: 'confirm',
          phone: user.phone,
        }));

        dispatch(openPopup('confirmPopup', {
          callback: data => dispatch(confirmRegistration(data)),
          previousPopup: 'registerPopup',
        }));
      })
      .catch((error) => {
        dispatch(setError('registration', JSON.parse(error.message)));
      });
  };
};

export default registration;
