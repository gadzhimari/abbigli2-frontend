import { setFetchingStatus, setError, handleSucces } from './common';
import { Auth } from 'API';

const login = (creds, callback) => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signIn(creds)
    .then((res) => {
      const data = new Date();
      data.setTime(data.getTime() + (60 * 60 * 24 * 1000 * 1000));

      document.cookie = `id_token=${res.data.token}; expires=${data.toUTCString()}`;

      dispatch(handleSucces({ isAuthenticated: true }));
      callback();
    })
    .catch((error) => {
      dispatch(setError('login', error.response.data));
    });
};

export default login;
