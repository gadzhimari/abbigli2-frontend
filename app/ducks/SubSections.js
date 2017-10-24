// SubSections.js
import { API_URL } from 'config';
import { createQuery } from 'utils/functions';


// Actions
const REQUEST = 'abbigli/SubSections/REQUEST';
const REQUEST_APPEND = 'abbigli/SubSections/REQUEST_APPEND';
const SET = 'abbigli/SubSections/SET';
const APPEND = 'abbigli/SubSections/APPEND';
const LOAD_POSTS = 'abbigli/SubSections/LOAD_POSTS';
const LOADED_POSTS = 'abbigli/SubSections/LOADED_POSTS';

const initialState = {
  isFetching: true,
  isFetchingMore: false,
  data: null,
  next: null,
  items: [],
  pagesCount: 0,
  isFetchingPosts: true,
  posts: [],
};

// Reducer
export default function (state = initialState, action = {}) {
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
        data: action.data,
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
    case LOAD_POSTS:
      return Object.assign({}, state, {
        isFetchingPosts: true,
      });
    case LOADED_POSTS:
      return Object.assign({}, state, {
        isFetchingPosts: false,
        posts: action.posts,
        pagesCount: Math.ceil(action.count / 50),
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

export function fetchData(options = {}) {
  const query = createQuery(options);

  return (dispatch) => {
    if (!options.page) {
      dispatch(requestData());
    } else {
      dispatch(requestDataAppend());
    }

    return fetch(`${API_URL}tags/${query}`)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData.results) {
          if (!options.page) {
            dispatch(setData(responseData));
          } else {
            dispatch(appendData(responseData));
          }
        }

        return Promise.resolve();
      });
  };
}

const fetchingPosts = () => ({
  type: LOAD_POSTS,
});

const fetchedPosts = (posts, count) => ({
  type: LOADED_POSTS,
  posts,
  count,
});

export const fetchSectionPosts = options => (dispatch) => {
  dispatch(fetchingPosts());
  const query = createQuery(options);

  return fetch(`${API_URL}posts/${query}`)
    .then(res => res.json())
    .then(result => dispatch(fetchedPosts(result.results, result.count)));
};
