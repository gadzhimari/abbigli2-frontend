import { API_URL } from 'config';

import { setFollowing } from 'ducks/Profile';
import { getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL + 'profiles/:profileId/follow/';

// Actions

export function setFollow(profileId) {
  const token = getJsonFromStorage('id_token');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
    if(token){config.headers.Authorization = `JWT ${token}`;}
  return dispatch => {
    return fetch(ENDPOINT.replace(':profileId', profileId), config)
      .then(res => res.json())
      .then((response) => {
        if (response) {
          dispatch(setFollowing(response));
        }
      })
      .catch(err => console.log("Error: ", err));
  };
}
