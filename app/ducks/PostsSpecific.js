// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage, createQuery } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/PostsSpecific/REQUEST';
const SET = 'abbigli/PostsSpecific/SET';

// Reducer
export default function (state = {
  isFetching: true,
  next: null,
  items: [],
  pages: 0,
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        data: action.data,
        next: action.data.next,
        pages: Math.ceil(action.data.count / 30),
        isFetching: false,
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
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

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function fetchData(specific = '', options = {}) {
  const token = getJsonFromStorage('id_token') || null;
  const config = { headers: {} };
  const query = createQuery(options);

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(requestData());

    return fetch(`${API_URL}posts/${specific}${query}`, config)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          dispatch(setData(responseData));
        }
      });
  };
}
