import { createAction } from 'redux-actions';

import { Profile } from '../../../api';
import { setNetworkError } from './../../NetworkErrors/reducer';

export const loadProfileRequest = createAction('LOAD_PROFILE_REQUEST');
export const loadProfileResponse = createAction('LOAD_PROFILE_RESPONSE');

export const moreFollowersRequest = createAction('MORE_FOLLOWERS_REQUEST');
export const moreFollowersResponse = createAction('MORE_FOLLOWERS_RESPONSE');
export const moreFollowingRequest = createAction('MORE_FOLLOWING_REQUEST');
export const moreFollowingResponse = createAction('MORE_FOLLOWING_RESPONSE');


const loadProfile = (id, isAuth) => (dispatch, getState) => {
  const { Auth } = getState();

  const promises = [];
  const isMe = Auth.me.id === Number(id);

  promises.push(Profile.getData(id, isMe, isAuth).catch(({ response }) => {
    dispatch(setNetworkError(response));
  }));
  promises.push(Profile.getFollowers(id, isMe, isAuth, 'followers'));

  if (isMe) {
    promises.push(Profile.getFollowers(id, isMe, isAuth, 'following'));
  }
  dispatch(loadProfileRequest());

  return Promise.all(promises)
    .then((data) => {
      const [profile, followers, following = { data: {} }] = data;

      dispatch(loadProfileResponse({
        profile: profile.data,
        followers: followers.data,
        following: following.data,
        isMe
      }));
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
