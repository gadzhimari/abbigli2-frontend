import { SET_FOLLOWING } from '../actionTypes';

import { getJsonFromStorage } from '../../../utils/functions';
import onlyAuthAction from '../../../lib/redux/onlyAuthAction';
import { API_URL } from '../../../config';

const updateFollow = () => ({
  type: SET_FOLLOWING,
});

const setFollow = id => (dispatch) => {
  const token = getJsonFromStorage('id_token');

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  config.headers.Authorization = `JWT ${token}`;

  dispatch(updateFollow());

  return fetch(`${API_URL}profiles/${id}/follow/`, config);
};

export default onlyAuthAction(setFollow);
