import * as types from './types';

import { getJsonFromStorage } from 'utils/functions';
import { API_URL } from 'config';

import { setMe } from '../../Auth/authActions/fetchMe';

const uploadImageRequest = imageName => ({
  type: types.IMAGE_UPLOAD_REQUEST,
  imageName,
});

const uploadImageResponse = data => ({
  type: types.IMAGE_UPLOAD_RESPONSE,
  data,
});

const uploadImage = ({ target }) => {
  const token = getJsonFromStorage('id_token');

  if (!token) return null;

  const formData = new FormData();
  formData.append(target.name, target.files[0]);

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
    dispatch(uploadImageRequest(target.name));

    return fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(uploadImageResponse(response));
        dispatch(setMe(response));
      });
  };
};

export default uploadImage;
