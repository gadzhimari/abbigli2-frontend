import { API_URL } from 'config';

import { fetchData as fetchDataAuthors } from 'ducks/ProfilePosts';

import { getJsonFromStorage } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/BlogPost/REQUEST';
const SET = 'abbigli/BlogPost/SET';
const RESET = 'abbigli/BlogPost/RESET';
const ERROR_404 = 'abbigli/BlogPost/ERROR_404';
const CHANGE_FOLLOW = 'abbigli/BlogPost/CHANGE_FOLLOW';

const initialState = {
  isFetching: true,
  data: {},
  isDefined: true,
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.data,
        isFetching: false,
        isDefined: true,
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: {},
        isDefined: true,
      });
    case ERROR_404:
      return Object.assign({}, state, {
        isFetching: false,
        isDefined: false,
      });
    case RESET:
      return Object.assign({}, state, {
        isFetching: true,
        isDefined: true,
        data: {},
      });
    case CHANGE_FOLLOW: {
      const newUser = Object.assign({}, state.data.user, {
        is_subscribed: !state.data.user.is_subscribed,
      });
      const newData = Object.assign({}, state.data, {
        user: newUser,
      });

      return Object.assign({}, state, {
        data: newData,
      });
    }
    default:
      return state;
  }
}

// Action Creators
export function requestData() {
  return {
    type: REQUEST,
  };
}

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function resetData() {
  return {
    type: RESET,
  };
}

export function setNotFound() {
  return {
    type: ERROR_404,
  };
}

export function setNewFollowStatus() {
  return {
    type: CHANGE_FOLLOW,
  };
}

export function fetchData(slug, type = 4) {
  const token = getJsonFromStorage('id_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return dispatch => {
    dispatch(requestData());

    return fetch(`${API_URL}posts/${slug}/?type=${type}`, config)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then((responseData) => {
        if (responseData) {
          dispatch(setData(responseData));
          dispatch(fetchDataAuthors({
            type: 'posts',
            excludeId: responseData.id,
            profileId: responseData.user.id,
          }));
        }
      })
      .catch(error => {
        if (error.message === '404') {
          dispatch(setNotFound());
        }
      });
  };
}
