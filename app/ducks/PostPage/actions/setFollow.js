import { SET_FOLLOWING } from '../actionTypes';

import { getJsonFromStorage } from 'utils/functions';
import { stagedPopup } from 'ducks/Auth/authActions';

import { API_URL } from 'config';

const updateFollow = () => ({
  type: SET_FOLLOWING,
});

const setFollow = (id) => {
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

    dispatch(updateFollow());

    return fetch(`${API_URL}profiles/${id}/follow/`, config);
  };
};

export default setFollow;
