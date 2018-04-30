import { Images } from '../../../api';

import * as actions from '../actionTypes';

const imageUploadReq = () => ({
  type: actions.LOAD_IMAGE_REQ,
});

const imageUploadRes = (imageError = []) => ({
  type: actions.LOAD_IMAGE_RES,
  imageError,
});

const uploadImages = (files, callback) => (dispatch) => {
  dispatch(imageUploadReq());

  const formData = new FormData();
  formData.append('files', files);

  return Images.uploadImage(formData)
    .then((res) => {
      callback(res.map(item => item.data));
      dispatch(imageUploadRes());
    })
    .catch(err => dispatch(imageUploadRes(err.response.data.file)));
};

export default uploadImages;
