import { handleSucces } from './common';
import { deleteCookie } from '../../../lib/cookie';

const logout = () => (dispatch) => {
  deleteCookie('id_token2');

  dispatch(handleSucces({
    isAuthenticated: false,
    me: {},
  }));
};

export default logout;
