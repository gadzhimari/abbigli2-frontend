import { handleActions } from 'redux-actions';
import {
  requestPosts,
  setPosts,
  setPrivateStatus
} from './actions/loadPosts';

import { deletePostFromPage } from './actions/deletePost';
import { calculatePagesCount } from '../../lib/calculatePagesCount';

const initialState = {
  isFetching: false,
  isFetchingMore: false,
  next: null,
  items: [],
  isPrivate: false,
  pagesCount: 1
};

export default handleActions({
  [requestPosts]: state => ({
    ...state,
    isFetching: true
  }),
  [setPosts]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    items: payload.results,
    next: payload.next,
    pagesCount: calculatePagesCount(payload.count)
  }),
  [setPrivateStatus]: (state, { payload }) => ({
    ...state,
    isPrivate: payload
  }),
  [deletePostFromPage]: (state, { payload }) => ({
    ...state,
    items: state.items.filter((item) => {
      if (Array.isArray(payload)) {
        return !payload.includes(item.slug);
      }

      return item.slug !== payload;
    })
  })
}, initialState);
