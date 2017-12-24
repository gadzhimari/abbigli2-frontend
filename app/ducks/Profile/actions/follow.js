import { Profile } from '../../../api';
import onlyAuthAction from '../../../lib/redux/onlyAuthAction';
import store from '../../../store/store';

import { CHANGE_FOLLOWING_STATUS, FOLLOW_USER, UNFOLLOW_USER } from './types';

const changeFollowStatus = status => ({
  payload: status,
  type: CHANGE_FOLLOWING_STATUS,
});

const followUser = followerData => ({
  type: FOLLOW_USER,
  payload: followerData,
});

const unfollowUser = followerId => ({
  type: UNFOLLOW_USER,
  payload: followerId,
});

const follow = (id, prevStatus) => (dispatch) => {
  dispatch(changeFollowStatus(true));
  const { me } = store.getState().Auth;

  Profile.follow(id)
    .then(() => {
      if (prevStatus) {
        dispatch(unfollowUser(me.id));
      } else {
        dispatch(followUser(me));
      }

      dispatch(changeFollowStatus(false));
    });
};

export default onlyAuthAction(follow);
