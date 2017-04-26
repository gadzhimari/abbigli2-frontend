import { API_URL } from 'config';

import { setFollowing } from 'ducks/Profile';
import { setNewFollowStatus } from 'ducks/BlogPost';
import { getJsonFromStorage } from 'utils/functions';

// Actions

export function setFollow(profileId) {
  const token = getJsonFromStorage('id_token');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(setNewFollowStatus());

    return fetch(`${API_URL}profiles/${profileId}/follow/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(setFollowing(response));
      });
  };
}
