import { handleSucces } from './common';

const logout = () => (dispatch) => {
  localStorage.removeItem('id_token');
  document.cookie = 'id_token=; expires=-1';

  dispatch(handleSucces({
    isAuthenticated: false,
    me: {},
  }));
};

export default logout;
