import { getJsonFromStorage } from 'utils/functions';

import { ME_STORE } from '../actionsTypes';
import { API_URL } from 'config';

const setMe = data => ({
  type: ME_STORE,
  data,
});

const fetchMe = (tokenId) => {
  const token = tokenId || getJsonFromStorage('id_token') || null;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  } else {
    return Promise.reject();
  }

  return dispatch => fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then(userData => dispatch(setMe(userData)));
};

export default fetchMe;
