import * as types from './types';
import { getJsonFromStorage } from 'utils/functions';
import { API_URL } from 'config';

import { setMe } from '../../Auth/authActions/fetchMe';

const saveRequest = () => ({
  type: types.SAVE_CHANGES_REQUEST,
});

const saveResponse = data => ({
  type: types.SAVE_CHANGES_RESPONSE,
  data,
});

const saveChanges = (data) => {
  const token = getJsonFromStorage('id_token');

  if (!token) return null;

  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(data),
  };

  return (dispatch) => {
    dispatch(saveRequest());

    return fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(saveResponse(response));
        dispatch(setMe(response));
      });
  };
};

export default saveChanges;
