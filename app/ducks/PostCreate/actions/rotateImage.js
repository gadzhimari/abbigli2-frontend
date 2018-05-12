import { Images } from '../../../api';

const rotateImage = (id, direction, callbacks) => {
  callbacks.req();

  Images.rotateImage({ id, direction })
    .then(res => callbacks.res(res.data.url));
};

export default rotateImage;
