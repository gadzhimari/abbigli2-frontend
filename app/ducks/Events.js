// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';
import moment from 'moment';

// Actions
const REQUEST = 'abbigli/Events/REQUEST';
const REQUEST_APPEND = 'abbigli/Events/REQUEST_APPEND';
const SET = 'abbigli/Events/SET';
const APPEND = 'abbigli/Events/APPEND';
const CHANGE_SEARCH_FIELD = 'abbigli/Events/CHANGE_SEARCH_FIELD';

// Reducer
export default function (state = {
  isFetching: true,
  next: null,
  items: [],
  isFetchingMore: false,
  page: 1,
  searchFields: {
    start: moment(new Date()).format('YYYY-MM-DD'),
    end: moment(new Date()).format('YYYY-MM-DD'),
    city: null,
  },
}, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        next: action.data.next,
        isFetching: false,
        page: action.page + 1,
      });
    case APPEND:
      return Object.assign({}, state, {
        items: state.items.concat(action.data.results),
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
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, {
        searchFields: Object.assign(state.searchFields, {
          [action.field]: action.value,
        }),
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

export const changeSearchField = (field, value) => ({
  type: CHANGE_SEARCH_FIELD,
  field,
  value,
});

export function fetchData(page = 1, filter = false, city = null, start = null, end = null, tokenID) {
  const token = tokenID || getJsonFromStorage('id_token') || null;
  const config = { headers: {} };

  const cityQuery = city
    ? `&city=${city.id}`
    : '';
  const startQuery = start
    ? `&date_start=${start}`
    : '';
  const endQuery = end
    ? `&date_end=${end}`
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

  return (dispatch) => {
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
            dispatch(setData(responseData, page));
          } else {
            dispatch(appendData(responseData, page));
          }
        }
        return Promise.resolve();
      });
  }
}
