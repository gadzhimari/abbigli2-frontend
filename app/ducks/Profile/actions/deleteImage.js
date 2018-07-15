import { createAction } from 'redux-actions';

import { Profile } from '../../../api';
import { setMe } from '../../Auth/authActions/fetchMe';

export const deleteImageRequest = createAction('IMAGE_DELETE_REQUEST');

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
