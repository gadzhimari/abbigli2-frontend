import { setFetchingStatus, setError, handleSucces } from './common';

import { openPopup } from '../../Popup/actions';

import { Auth } from '../../../api';
import { gaSend } from '../../../lib/analitics';

const confirmRegistration = creds => (dispatch) => {
  dispatch(setFetchingStatus());

  return Auth.signUpConfirm({ phone: creds.contact, code: creds.code })
    .then((res) => {
      document.cookie = `id_token=${res.data.token}`;

      dispatch(handleSucces({ registerStage: 'setPassword' }));
      dispatch(openPopup('passwordPopup'));

      gaSend({ hitType: 'pageview', page: '/firstlogin', title: 'Firstlogin' });
    })
    .catch(error => dispatch(setError('confirm', error.response.data)));
};


export default confirmRegistration;
