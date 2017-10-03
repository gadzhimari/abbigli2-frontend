import * as types from './types';

import { getJsonFromStorage } from 'utils/functions';
import { API_URL } from 'config';

import { setMe } from '../../Auth/authActions/fetchMe';

const deleteImageRequest = imageName => ({
  type: types.IMAGE_DELETE_REQUEST,
  data: {
    [imageName]: null,
  },
});

const deleteImage = (name) => {
  const token = getJsonFromStorage('id_token');

  if (!token) return null;

  const formData = new FormData();

  formData.append(name, new Blob(), '');

  const headers = {
    Accept: 'application/json, */*',
    Authorization: `JWT ${token}`,
  };

  const config = {
    headers,
    method: 'PATCH',
    body: formData,
  };

  return (dispatch) => {
    dispatch(deleteImageRequest(name));
    dispatch(setMe({
      [name]: null,
    }));

    return fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(setMe(response));
      });
  };
};

export default deleteImage;
