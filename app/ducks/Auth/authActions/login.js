import { setFetchingStatus, setError, handleSucces } from './common';
import { DOMAIN_URL } from 'config';

const login = (creds, callback) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`,
  };

  return (dispatch) => {
    dispatch(setFetchingStatus());

    return fetch(`${DOMAIN_URL}api/get-token/`, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          throw new Error(JSON.stringify(user));
        }

        const data = new Date();
        data.setTime(data.getTime() + (60 * 60 * 24 * 1000 * 1000));

        document.cookie = `id_token=${user.token}; expires=${data.toUTCString()}`;

        dispatch(handleSucces({
          isAuthenticated: true,
        }));
        callback();
      })
      .catch((error) => {
        dispatch(setError('login', JSON.parse(error.message)));
      });
  };
};

export default login;
