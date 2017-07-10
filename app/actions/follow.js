import { API_URL } from 'config';

import { setFollowing } from 'ducks/Profile';
import { updateFollow } from 'ducks/PostPage/actions';
import { getJsonFromStorage } from 'utils/functions';

const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
const FOLLOW_RESPONSE = 'FOLLOW_RESPONSE';

// Actions

const followReducer = (state = { isFetching: false }, action) => {
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

const followRequest = () => ({
  type: FOLLOW_REQUEST,
});

const followResponse = () => ({
  type: FOLLOW_RESPONSE,
});

export function setFollow(profileId, fromPost = true) {
  const token = getJsonFromStorage('id_token');
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    if (fromPost) {
      dispatch(updateFollow());
    }
    dispatch(followRequest());

    return fetch(`${API_URL}profiles/${profileId}/follow/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(setFollowing(response));
        dispatch(followResponse());
      });
  };
}

export default followReducer;
