import { createAction } from 'redux-actions';

import { Profile } from '../../api';
import onlyAuthAction from '../../lib/redux/onlyAuthAction';

export const SET_FOLLOW_STATUS = 'FOLLOW_REQUEST';

const followRequest = createAction(SET_FOLLOW_STATUS, () => ({ isFetching: true }));
const followResponse = createAction(SET_FOLLOW_STATUS, () => ({ isFetching: false }));

const follow = id => (dispatch) => {
  dispatch(followRequest());

  return Profile.follow(id)
    .then(() => {
      dispatch(followResponse());
      return Promise.resolve();
    });
};

export const setFollow = onlyAuthAction(follow);
