import * as types from './types';
import { getJsonFromStorage } from 'utils/functions';
import { API_URL } from 'config';

const loadProfileRequest = () => ({
  type: types.PROFILE_LOAD_REQUEST,
});

const loadProfileResponse = (profile, followers, following = [], isMe) => ({
  type: types.PROFILE_LOAD_RESPONSE,
  profile,
  followers,
  following,
  isMe,
});

const loadProfileData = (id, isMe, isAuth) => {
  const token = getJsonFromStorage('id_token');
  const config = {};

  if (isAuth && token) {
    config.headers = { Authorization: `JWT ${token}` };
  }

  const endpoint = isMe ? 'my-profile/' : `profiles/${id}/`;

  return fetch(`${API_URL}${endpoint}`, config)
    .then(res => res.json());
};

const loadFollowers = (id, isMe, isAuth, type) => {
  const token = getJsonFromStorage('id_token');
  const config = {};

  if (isAuth && token) {
    config.headers = { Authorization: `JWT ${token}` };
  }

  const endpoint = isMe ? `my-profile/${type}/` : `profiles/${id}/${type}/`;

  return fetch(`${API_URL}${endpoint}`, config)
    .then(res => res.json());
};

const loadProfile = (id, isMe, isAuth) => {
  const promises = [];

  promises.push(loadProfileData(id, isMe, isAuth));
  promises.push(loadFollowers(id, isMe, isAuth, 'followers'));

  if (isMe) {
    promises.push(loadFollowers(id, isMe, isAuth, 'following'));
  }

  return (dispatch) => {
    dispatch(loadProfileRequest());

    return Promise.all(promises)
      .then((data) => {
        const [profile, followers, following = {}] = data;

        dispatch(loadProfileResponse(profile, followers.results, following.results, isMe));
      });
  };
};

export default loadProfile;
