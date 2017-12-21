import { Profile } from '../api';
import onlyAuthAction from '../lib/redux/onlyAuthAction';

const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
const FOLLOW_RESPONSE = 'FOLLOW_RESPONSE';

const followRequest = () => ({
  type: FOLLOW_REQUEST,
});

const followResponse = () => ({
  type: FOLLOW_RESPONSE,
});

function follow(id) {
  return (dispatch) => {
    dispatch(followRequest());

    return Profile.follow(id)
      .then(() => {
        dispatch(followResponse());
        return Promise.resolve();
      });
  };
}

export const setFollow = onlyAuthAction(follow);

const defaultState = { isFetching: false };

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case (FOLLOW_REQUEST): {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }
    case (FOLLOW_RESPONSE): {
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
