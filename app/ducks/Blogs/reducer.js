import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './actions';

const PAGE_SIZE = 30;

const blogsFetchingState = handleActions({
  [actions.fetchBlogsRequest]() {
    return true;
  },
  [actions.fetchBlogsSuccess]() {
    return false;
  },
  [actions.fetchBlogsFailure]() {
    return false;
  },
}, true);

const page = handleActions({
  [actions.fetchBlogsSuccess](state, { payload: { results, count } }) {
    const pageCount = Math.ceil(count / PAGE_SIZE);
    return Object.assign({}, state, {
      items: results,
      count: pageCount,
    });
  },
}, {
  items: [],
  count: 1
});

const searchValue = handleActions({
  [actions.changeBlogsSearchValue](state, { payload: { value } }) {
    return value;
  },
}, '');

export default combineReducers({
  blogsFetchingState,
  searchValue,
  page,
});
