import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

const deleteImage = (id) => {
  const token = getJsonFromStorage('id_token');
  if (!token) return;

  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${token}`,
    },
  };


  fetch(`${API_URL}images/${id}/`, config);
};

export default deleteImage;
