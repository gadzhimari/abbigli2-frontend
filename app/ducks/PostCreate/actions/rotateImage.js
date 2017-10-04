import { Images } from 'API';

const rotateImage = (imageId, direction, callbacks) => {
  callbacks.req();

  Images.rotateImage(imageId, direction)
    .then(res => callbacks.res(res.data.url));
};

export default rotateImage;
