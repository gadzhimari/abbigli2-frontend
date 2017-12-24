import { Profile } from '../../api';
import onlyAuthAction from '../../lib/redux/onlyAuthAction';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_RESPONSE = 'FOLLOW_RESPONSE';

const followRequest = () => ({
  type: FOLLOW_REQUEST,
});

const followResponse = () => ({
  type: FOLLOW_RESPONSE,
});

const follow = id => (dispatch) => {
  dispatch(followRequest());

  return Profile.follow(id)
    .then(() => {
      dispatch(followResponse());
      return Promise.resolve();
    });
};

export const setFollow = onlyAuthAction(follow);
