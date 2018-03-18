import * as types from './types';
import { Profile } from '../../../api';

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

const moreFollowersRequest = () => ({
  type: types.MORE_FOLLOWERS_REQUEST,
});

const moreFollowersResponse = data => ({
  type: types.MORE_FOLLOWERS_RESPONSE,
  data,
});

const moreFollowingRequest = () => ({
  type: types.MORE_FOLLOWING_REQUEST,
});

const moreFollowingResponse = data => ({
  type: types.MORE_FOLLOWING_RESPONSE,
  data,
});

const loadProfile = (id, isAuth) => (dispatch, getState) => {
  const { Auth } = getState();

  const promises = [];
  const isMe = Auth.me.id === Number(id);

  promises.push(Profile.getData(id, isMe, isAuth));
  promises.push(Profile.getFollowers(id, isMe, isAuth, 'followers'));

  if (isMe) {
    promises.push(Profile.getFollowers(id, isMe, isAuth, 'following'));
  }
  dispatch(loadProfileRequest());

  return Promise.all(promises)
    .then((data) => {
      const [profile, followers, following = { data: {} }] = data;

      dispatch(loadProfileResponse(profile.data, followers.data, following.data, isMe));
    });
};

export const loadMoreFollowers = (id, isMe, isAuth, options) => (dispatch) => {
  dispatch(moreFollowersRequest());

  return Profile.getFollowers(id, isMe, isAuth, 'followers', options)
    .then((res) => {
      dispatch(moreFollowersResponse(res.data));
    });
};

export const loadMoreFollowing = (id, isMe, isAuth, options) => (dispatch) => {
  dispatch(moreFollowingRequest());

  return Profile.getFollowers(id, isMe, isAuth, 'following', options)
    .then((res) => {
      dispatch(moreFollowingResponse(res.data));
    });
};

export default loadProfile;
