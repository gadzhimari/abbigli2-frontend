import { getJsonFromStorage } from 'utils/functions';
import { API_URL } from 'config';

import * as actions from '../actionTypes';

const imageUploadReq = () => ({
  type: actions.LOAD_IMAGE_REQ,
});

const imageUploadRes = (imageError = []) => ({
  type: actions.LOAD_IMAGE_RES,
  imageError,
});

const uploadImages = (files, callback) => {
  const token = getJsonFromStorage('id_token');
  const promises = [];

  if (!token) return;

  return (dispatch) => {
    dispatch(imageUploadReq());

    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        method: 'POST',
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: formData,
      };

      promises.push(
        fetch(`${API_URL}images/`, config)
          .then(res => res.json())
      );
    });

    return Promise.all(promises)
      .then((responseData) => {
        const errors = [];
        const images = [];

        responseData.forEach((img) => {
          if (img.id) {
            images.push(img);
          } else {
            errors.push(img.file[0]);
          }
        });
        callback(images);
        dispatch(imageUploadRes(errors));
      })
      .catch(err => console.log("Error: ", err));
  };
};

export default uploadImages;
