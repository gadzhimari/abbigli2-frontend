import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

const rotateImage = (imageId, direction, callbacks) => {
  const token = getJsonFromStorage('id_token');
  if (!token) return;

  const config = {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  callbacks.req();

  fetch(`${API_URL}images/${imageId}/rotate-${direction}/`, config)
    .then(res => res.json())
    .then(({ url }) => callbacks.res(url));
};

export default rotateImage;
