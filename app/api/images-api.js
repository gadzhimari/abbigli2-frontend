import { requestV2 } from './instance';

const Images = {
  uploadImage(data) {
    return requestV2({
      url: 'images/',
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  deleteImage(id) {
    return requestV2({
      url: `images/${id}/`,
      method: 'DELETE',
      mustApplyToken: true,
    });
  },
  rotateImage(id, direction) {
    return requestV2({
      url: `images/${id}/rotate-${direction}/`,
      method: 'POST',
      mustApplyToken: true,
    });
  },
};

export default Images;
