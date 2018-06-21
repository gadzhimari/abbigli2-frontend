import { createAction } from 'redux-actions';

import { Profile } from '../../../api';
import { setMe } from '../../Auth/authActions/fetchMe';

export const uploadImageRequest = createAction('UPLOAD_IMAGE_REQUEST');
export const uploadImageResponse = createAction('UPLOAD_IMAGE_RESPONSE');

const uploadImage = ({ target }) => {
  const formData = new FormData();
  formData.append(target.name, target.files[0]);

  return (dispatch) => {
    dispatch(uploadImageRequest(target.name));

    return Profile.saveChanges(formData)
      .then((response) => {
        // Обновление картинки в профиле
        dispatch(uploadImageResponse(response.data));
        // Обновление картинки в шапке и других местах где используется store.Auth.me
        dispatch(setMe(response.data));
      });
  };
};

export default uploadImage;
