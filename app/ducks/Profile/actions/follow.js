import { createAction } from 'redux-actions';

import { Profile } from '../../../api';
import onlyAuthAction from '../../../lib/redux/onlyAuthAction';

export const changeFollowStatus = createAction('CHANGE_FOLLOW_STATUS');
export const followUser = createAction('FOLLOW_USER');
export const unfollowUser = createAction('UNFOLLOW_USER');

const follow = (id, prevStatus) => (dispatch, getState) => {
  dispatch(changeFollowStatus(true));

  const { me } = getState().Auth;

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
