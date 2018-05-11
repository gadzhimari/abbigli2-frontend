import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from '../../Popup/actions';

import { Auth } from '../../../api';
import { gaSend } from '../../../lib/analitics';
import { setCookie } from '../../../lib/cookie';

// Куки живут 10 дней
const COOKIES_EXPIRES = 3600 * 24 * 10;

const confirmRegistration = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signUpConfirm({ phone: creds.contact, code: creds.code })
    .then((res) => {
      setCookie('id_token2', res.data.token, { expires: COOKIES_EXPIRES });

      dispatch(handleSucces({ signUpStage: 'setPassword' }));
      dispatch(openPopup('passwordPopup'));

      gaSend({ hitType: 'pageview', page: '/firstlogin', title: 'Firstlogin' });
    })
    .catch(error => dispatch(setError('confirm', error.response.data)));
};


export default confirmRegistration;
