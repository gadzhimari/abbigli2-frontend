import { Posts } from '../api';

// Actions
const REQUEST = 'abbigli/Blogs/REQUEST';
const SET = 'abbigli/Blogs/SET';
const SEARCH_VALUE_CHANGE = 'abbigli/Blogs/SEARCH_VALUE_CHANGE';

// Reducer
export default (state = {
  isFetching: true,
  next: null,
  items: [],
  isFetchingMore: false,
  page: 1,
  pages: 1,
  searchValue: '',
}, action = {}) => {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        items: action.data.results,
        next: action.data.next,
        isFetching: false,
        page: action.page + 1,
        pages: Math.ceil(action.data.count / 30),
      });
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
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

export function setData(responseData, page) {
  return {
    type: SET,
    data: responseData,
    page,
  };
}

export const changeSearchValue = value => ({
  type: SEARCH_VALUE_CHANGE,
  value,
});

export function fetchData(options = {}) {
  return (dispatch) => {
    dispatch(requestData());

    return Posts.getPosts(options)
      .then((responseData) => {
        dispatch(setData(responseData.data, options.page));
        return Promise.resolve();
      });
  };
}
