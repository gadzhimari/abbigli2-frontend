// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/Profile/REQUEST';
const SET = 'abbigli/Profile/SET';
const SET_ERRORS = 'abbigli/Profile/SET_ERRORS';
const SET_PROFILE = 'abbigli/Profile/SET_PROFILE';
const SET_FOLLOWING = 'abbigli/Profile/SET_FOLLOWING';
const UPDATE_BANNER = 'abbigli/Profile/UPDATE_BANNER';
const UPDATE_PROFILE_FIELD = 'abbigli/Profile/UPDATE_PROFILE_FIELD';
const SET_ERROR_404 = 'abbigli/Profile/SET_ERROR_404';

// Initial state

const initialState = {
  isFetching: true,
  data: {},
  errors: null,
  isMe: false,
  followers: [],
  following: null,
  isDefined: true,
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        data: action.result.data,
        isFetching: false,
        errors: null,
        isMe: action.result.isMe,
        followers: action.result.followers,
        following: action.result.following,
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: {},
        isDefined: true,
      });
    case SET_ERRORS:
      return Object.assign({}, state, {
        errors: action.errors,
      });
    case SET_PROFILE:
      return Object.assign({}, state, {
        data: action.profile,
        isDefined: true,
      });
    case SET_FOLLOWING: {
      const newData = Object.assign({}, state.data, action.followed);
      return Object.assign({}, state, {
        data: newData,
      });
    }
    case UPDATE_BANNER: {
      const newData = Object.assign({}, state.data, action.image);
      return Object.assign({}, state, {
        data: newData,
      });
    }
    case UPDATE_PROFILE_FIELD: {
      const data = Object.assign({}, state.data, action.data);
      return Object.assign({}, state, {
        data,
      });
    }
    case SET_ERROR_404: {
      return Object.assign({}, state, {
        isDefined: false,
        isFetching: false,
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

export function setData(result) {
  return {
    type: SET,
    result,
  };
}

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export function setErrors(errors) {
  return {
    type: SET_ERRORS,
    errors,
  };
}
export function setFollowing(followed) {
  return {
    type: SET_FOLLOWING,
    followed,
  };
}

export function updateBanner(image) {
  return {
    type: UPDATE_BANNER,
    image,
  };
}

export function updateProfile(data) {
  return {
    type: UPDATE_PROFILE_FIELD,
    data,
  };
}

export const fetchProfile = (isMe, id, isAuth) => {
  const token = getJsonFromStorage('id_token');
  const config = isAuth
    ? {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
    : {};
  const endpoint = isMe
    ? `${API_URL}my-profile/`
    : `${API_URL}profiles/${id}/`;

  return fetch(endpoint, config)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.status);
    });
};

export const fetchFollowers = (isMe, id, isAuth) => {
  const token = getJsonFromStorage('id_token');
  const config = isAuth
    ? {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
    : {};
  const endpoint = isMe
    ? `${API_URL}my-profile/followers/`
    : `${API_URL}profiles/${id}/followers/`;

  return fetch(endpoint, config)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      return response.json();
    });
};

export const fetchFollowing = () => {
  const token = getJsonFromStorage('id_token') || null;
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  return fetch(`${API_URL}my-profile/following/`, config)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      return response.json();
    });
};

const setNotFound = () => ({
  type: SET_ERROR_404,
});

export function fetchData(isMe, id, isAuth) {
  const promises = [];

  promises.push(fetchProfile(isMe, id, isAuth));
  promises.push(fetchFollowers(isMe, id, isAuth));
  if (isMe) {
    promises.push(fetchFollowing());
  }

  return (dispatch) => {
    dispatch(requestData());

    return Promise.all(promises)
      .then(([profile, followers, following]) => {
        const result = {
          data: profile,
          isMe,
          followers: followers.results,
          following: following
            ? following.results
            : null,
        };

        dispatch(setData(result));
      })
      .catch((error) => {
        if (error.message === '404') {
          dispatch(setNotFound());
        }
      });
  };
}
