import { request } from './instance';

const Images = {
  uploadImage(data) {
    return request({
      url: 'images/',
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  deleteImage(id) {
    return request({
      url: `images/${id}/`,
      method: 'DELETE',
      mustApplyToken: true,
    });
  },
  rotateImage(id, direction) {
    return request({
      url: `images/${id}/rotate-${direction}/`,
      method: 'POST',
      mustApplyToken: true,
    });
  },
};

export default Images;
