import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from '../../Popup/actions';

import { Auth } from '../../../api';
import { setCookie } from '../../../lib/cookie';

// Куки живут 10 дней
const COOKIES_EXPIRES = 3600 * 24 * 10;

const confirmReset = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  Auth.resetPasswordConfirm(creds)
    .then((res) => {
      setCookie('id_token2', res.data.token, { expires: COOKIES_EXPIRES });

      dispatch(handleSucces({ resetStage: 'password' }));
      dispatch(openPopup('passwordPopup'));
    })
    .catch((error) => {
      dispatch(setError('confirmReset', error.response.data));
    });
};

export default confirmReset;
