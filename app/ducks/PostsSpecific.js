// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage, createQuery } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/PostsSpecific/REQUEST';
const REQUEST_APPEND = 'abbigli/PostsSpecific/REQUEST_APPEND';
const SET = 'abbigli/PostsSpecific/SET';
const APPEND = 'abbigli/PostsSpecific/APPEND';

// Reducer
export default function (state = {
  isFetching: true,
  next: null,
  items: [],
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        data: action.data,
        next: action.data.next,
        isFetching: false,
      });
    case APPEND:
      return Object.assign({}, state, {
        items: state.items.concat(action.data.results),
        data: action.data,
        next: action.data.next,
        isFetching: false,
      });
    case REQUEST:
      return Object.assign({}, {
        isFetching: true,
        items: [],
      });
    case REQUEST_APPEND:
      return Object.assign({}, state, {
        isFetching: true,
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

// Action Creators
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

export function fetchData(specific = '', options) {
  const token = getJsonFromStorage('id_token') || null;
  const config = { headers: {} };
  const query = createQuery(options);

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    if (!options.page) {
      dispatch(requestData());
    } else {
      dispatch(requestDataAppend());
    }

    return fetch(`${API_URL}posts/${specific}${query}`, config)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          if (!options.page == 1) {
            dispatch(setData(responseData));
          } else {
            dispatch(appendData(responseData));
          }
        }
      });
  };
}
