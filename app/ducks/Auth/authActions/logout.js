import { handleSucces } from './common';

const logout = () => (dispatch) => {
  localStorage.removeItem('id_token');
  document.cookie = 'id_token=';

  dispatch(handleSucces({
    isAuthenticated: false,
    me: {},
  }));
};

export default logout;
