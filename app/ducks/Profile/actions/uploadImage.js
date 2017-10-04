import * as types from './types';

import { Profile } from 'API';

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
  const formData = new FormData();
  formData.append(target.name, target.files[0]);

  return (dispatch) => {
    dispatch(uploadImageRequest(target.name));

    return Profile.saveChanges(formData)
      .then((response) => {
        dispatch(uploadImageResponse(response.data));
        dispatch(setMe(response.data));
      });
  };
};

export default uploadImage;
