import { TOGGLE_FAVORITE } from '../actionTypes';

import { getJsonFromStorage } from 'utils/functions';
import { stagedPopup } from 'ducks/Auth/authActions';

import { API_URL } from 'config';

const updateFavorite = () => ({
  type: TOGGLE_FAVORITE,
});

const toggleFavorite = (slug) => {
  const token = getJsonFromStorage('id_token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    } else {
      return dispatch(stagedPopup('register'));
    }

    dispatch(updateFavorite());

    return fetch(`${API_URL}posts/${slug}/favorite/`, config);
  };
};

export default toggleFavorite;
