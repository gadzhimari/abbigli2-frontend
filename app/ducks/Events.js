// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

// Actions
const REQUEST = 'abbigli/Events/REQUEST';
const REQUEST_APPEND = 'abbigli/Events/REQUEST_APPEND';
const SET = 'abbigli/Events/SET';
const APPEND = 'abbigli/Events/APPEND';

// Reducer
export default function (state = {
  isFetching: false,
  next: null,
  items: [],
  isFetchingMore: false,
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        next: action.data.next,
        isFetching: false,
      });
    case APPEND:
      return Object.assign({}, state, {
        items: state.items.concat(action.data.results),
        next: action.data.next,
        isFetchingMore: false,
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

export function setData(responseData) {
  return { type: SET, data: responseData };
}

export function appendData(responseData) {
  return { type: APPEND, data: responseData };
}

export function fetchData(page = 1, filter = false, city = null, start = null, end = null) {
  const token = getJsonFromStorage('id_token') || null;
  const config = { headers: {} };

  const cityQuery = city
    ? `&city=${city.id}`
    : '';
  const startQuery = start
    ? `&period_start=${start}`
    : '';
  const endQuery = end
    ? `&period_end=${end}`
    : '';
  const filterQuery = filter
    ? '&popular=1'
    : '';
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
    return fetch(`${API_URL}posts/?type=3${pageQuery}${cityQuery}${startQuery}${endQuery}${filterQuery}`, config)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          if (page === 1) {
            dispatch(setData(responseData));
          } else {
            dispatch(appendData(responseData));
          }
        }
      });
  }
}
