import * as types from './types';
import { Profile } from 'API';

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

const loadProfile = (id, isMe, isAuth) => {
  const promises = [];

  promises.push(Profile.getData(id, isMe, isAuth));
  promises.push(Profile.getFollowers(id, isMe, isAuth, 'followers'));

  if (isMe) {
    promises.push(Profile.getFollowers(id, isMe, isAuth, 'following'));
  }

  return (dispatch) => {
    dispatch(loadProfileRequest());

    return Promise.all(promises)
      .then((data) => {
        const [profile, followers, following = { data: {} }] = data;

        dispatch(loadProfileResponse(profile.data, followers.data.results, following.data.results, isMe));
      });
  };
};

export default loadProfile;
