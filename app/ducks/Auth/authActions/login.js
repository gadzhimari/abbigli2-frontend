import { setFetchingStatus, setError, handleSucces } from './common';
import { Auth } from '../../../api';

import { setCookie } from '../../../lib/cookie';

// Куки живут 10 дней
const COOKIES_EXPIRES = 3600 * 24 * 10;

const login = (creds, callback) => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signIn(creds)
    .then((res) => {
      setCookie('id_token2', res.data.token, { expires: COOKIES_EXPIRES });

      dispatch(handleSucces({ isAuthenticated: true }));
      callback();
    })
    .catch((error) => {
      dispatch(setError('login', error.response.data));
    });
};

export default login;
