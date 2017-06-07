// Sections.js
import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

// Actions
const REQUEST   = 'abbigli/Blogs/REQUEST';
const REQUEST_APPEND   = 'abbigli/Blogs/REQUEST_APPEND';
const SET = 'abbigli/Blogs/SET';
const APPEND = 'abbigli/Blogs/APPEND';
const SEARCH_VALUE_CHANGE = 'abbigli/Blogs/SEARCH_VALUE_CHANGE';

// Reducer
export default (state = {
  isFetching: true,
  next: null,
  items: [],
  isFetchingMore: false,
  page: 1,
  searchValue: '',
}, action = {}) => {
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
    case SEARCH_VALUE_CHANGE:
      return Object.assign({}, state, {
        searchValue: action.value,
      });
    default:
      return state;
  }
};

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
  return {
    type: SET,
    data: responseData,
    page,
  };
}

export function appendData(responseData, page) {
  return { type: APPEND, data: responseData, page };
}

export const changeSearchValue = value => ({
  type: SEARCH_VALUE_CHANGE,
  value,
});

export function fetchData(page = 1, request = '', popular = null, tokenID) {
  const token = tokenID || getJsonFromStorage('id_token') || null;
  const config = { headers: {} };

  const filter = popular
    ? '&popular=1'
    : '';

  const pageQuery = page === 1
    ? ''
    : `page=${page}&`;

  const searchQuery = request.length
    ? `&search=${request}`
    : '';

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    if (page === 1) {
      dispatch(requestData());
    } else {
      dispatch(requestDataAppend());
    }

    return fetch(`${API_URL}posts/?${pageQuery}type=4${filter}${searchQuery}`, config)
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
  };
}
