// Sections.js
import { Posts } from '../api';

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
  currentTag: null,
  currentSection: null,
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
        currentTag: action.tag,
        currentSection: action.section,
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

export function setData(responseData, page = 1, section, tag) {
  return {
    type: SET,
    data: responseData,
    page,
    section,
    tag,
  };
}

export function appendData(responseData, page) {
  return { type: APPEND, data: responseData, page };
}

export function fetchData(options) {
  return (dispatch) => {
    if (!options.page || options.page === 1) {
      dispatch(requestData());
    } else {
      dispatch(requestDataAppend());
    }
    return Posts.getPosts(options)
      .then((res) => {
        if (!options.page || options.page === 1) {
          dispatch(setData(res.data, options.page, options.section, options.tag));
        } else {
          dispatch(appendData(res.data, options.page));
        }
      });
  };
}
