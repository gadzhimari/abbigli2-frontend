// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/Posts/REQUEST';
const REQUEST_APPEND = 'abbigli/Posts/REQUEST_APPEND';
const SET = 'abbigli/Posts/SET';
const APPEND = 'abbigli/Posts/APPEND';

const initialState = {
  isFetching: true,
  isFetchingMore: false,
  page: 1,
  next: null,
  items: [],
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
        page: action.page + 1,
      });
    case APPEND:
      return Object.assign({}, state, {
        items: state.items.concat(action.data.results),
        data: action.data,
        next: action.data.next,
        isFetchingMore: false,
        page: action.page + 1,
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
      });
    case REQUEST_APPEND:
      return Object.assign({}, state, {
        isFetchingMore: true,
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

export function setData(responseData, page) {
  return { type: SET, data: responseData, page };
}


export function appendData(responseData, page) {
  return { type: APPEND, data: responseData, page };
}

export function fetchData(section, tag, page = 1) {
  const token = getJsonFromStorage('id_token') || null;
  const config = { headers: {} };
  const pageQuery = page === 1
    ? ''
    : `&page=${page}`;

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return dispatch => {
    if (page === 1) {
      dispatch(requestData());
    } else {
      dispatch(requestDataAppend());
    }
    return fetch(`${API_URL}posts/?section=${section}&tags=${tag}${pageQuery}`, config)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          if (page === 1) {
            dispatch(setData(responseData, page));
          } else {
            dispatch(appendData(responseData, page));
          }
        }
      });
  };
}
