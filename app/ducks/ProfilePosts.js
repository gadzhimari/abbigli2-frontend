// Sections.js
import { API_URL } from 'config';
import { setJsonToStorage, getJsonFromStorage } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/ProfilePosts/REQUEST';
const REQUEST_APPEND = 'abbigli/ProfilePosts/REQUEST_APPEND';
const SET = 'abbigli/ProfilePosts/SET';
const APPEND = 'abbigli/ProfilePosts/APPEND';
const SET_PRIVATE_STATUS = 'abbigli/ProfilePosts/SET_PRIVATE_STATUS';
const REMOVE_FROM_FAVORITES = 'abbigli/ProfilePosts/REMOVE_FROM_FAVORITES';
const DELETE_POST = 'abbigli/ProfilePosts/DELETE_POST';

// Initial state

const initialState = {
  isFetching: false,
  next: null,
  items: [],
  isPrivate: false,
  isFetchingMore: false,
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        data: action.data,
        next: action.data.next,
        isFetching: false,
        isFetchingMore: false,
      });
    case APPEND:
      return Object.assign({}, state, {
        items: state.items.concat(action.data.results),
        data: action.data,
        next: action.data.next,
        isFetchingMore: false,
      });
    case REQUEST:
      return Object.assign({}, {
        isFetching: true,
        items: [],
        isPrivate: false,
      });
    case REQUEST_APPEND:
      return Object.assign({}, state, {
        isFetchingMore: true,
      });
    case SET_PRIVATE_STATUS:
      return Object.assign({}, state, {
        isPrivate: true,
        isFetching: false,
      });
    case REMOVE_FROM_FAVORITES:
      return Object.assign({}, state, {
        items: state.items
          .filter(item => item.slug !== action.slug),
      });
    case DELETE_POST:
      return Object.assign({}, state, {
        items: state.items
          .filter(item => item.slug !== action.slug),
      });
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

export function requestDataAppend() {
  return {
    type: REQUEST_APPEND,
  };
}

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function appendData(responseData) {
  return { type: APPEND, data: responseData };
}

function setPrivateStatus() {
  return {
    type: SET_PRIVATE_STATUS,
  };
}

export function removePostFromFavorites(slug) {
  return {
    type: REMOVE_FROM_FAVORITES,
    slug,
  };
}

const deletePost = slug => ({
  type: DELETE_POST,
  slug,
});

export function fetchData(option) {
  const token = getJsonFromStorage('id_token') || null;
  const { isMe, type = 'posts', excludeId, page = 1, profileId, isAuth } = option;
  const excluded = excludeId
    ? `exclude_id=${excludeId}&`
    : '';
  const pageQuery = `page=${page}`;
  const endpoint = isMe
    ? `${API_URL}my-profile/${type}/?${excluded}${pageQuery}`
    : `${API_URL}profiles/${profileId}/${type}/?${excluded}${pageQuery}`;
  const config = isAuth
    ? {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
    : {};

  return dispatch => {
    if (page === 1) {
      dispatch(requestData());
    } else {
      dispatch(requestDataAppend());
    }

    return fetch(endpoint, config)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status);
      })
      .then((responseData) => {
        if (responseData.results) {
          if (page === 1) {
            dispatch(setData(responseData));
          } else {
            dispatch(appendData(responseData));
          }
        }
      })
      .catch(e => {
        if (e.message === '403') {
          dispatch(setPrivateStatus());
        }
      });
  };
}

export function removePost(slug) {
  const token = getJsonFromStorage('id_token') || null;
  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  return dispatch => {
    dispatch(deletePost(slug));

    return fetch(`${API_URL}posts/${slug}/`, config);
  };
}

export function removeFromFavorites(slug) {
  const token = getJsonFromStorage('id_token') || null;
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
  };
  
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return dispatch => {
    dispatch(removePostFromFavorites(slug));

    return fetch(`${API_URL}posts/${slug}/favorite/`, config);
  };
}
