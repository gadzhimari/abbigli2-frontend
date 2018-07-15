import { requestV2 } from './instance';
import { API_URL_V2 } from '../config';

export const fullImagesApiUrl = `${API_URL_V2}images/`;

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
  rotateImage(data) {
    return requestV2({
      url: 'images/rotate/',
      method: 'POST',
      data,
      mustApplyToken: true
    });
  },
};

export default Images;
