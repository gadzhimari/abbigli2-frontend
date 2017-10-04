import * as types from './types';

import { Profile } from 'API';

import { setMe } from '../../Auth/authActions/fetchMe';

const deleteImageRequest = imageName => ({
  type: types.IMAGE_DELETE_REQUEST,
  data: {
    [imageName]: null,
  },
});

const deleteImage = (name) => {
  const formData = new FormData();
  formData.append(name, new Blob(), '');

  return (dispatch) => {
    dispatch(deleteImageRequest(name));
    dispatch(setMe({
      [name]: null,
    }));

    return Profile.saveChanges(formData)
      .then((response) => {
        dispatch(setMe(response.data));
      });
  };
};

export default deleteImage;
