import { handleActions } from 'redux-actions';
import {
  requestPosts,
  requestMorePosts,
  setPosts,
  setMorePosts,
  setPrivateStatus
} from './actions/loadPosts';

import { deletePostFromPage } from './actions/deletePost';

const initialState = {
  isFetching: false,
  isFetchingMore: false,
  next: null,
  items: [],
  isPrivate: false,
};

export default handleActions({
  [requestPosts]: state => ({
    ...state,
    isFetching: true
  }),
  [requestMorePosts]: state => ({
    ...state,
    isFetchingMore: true
  }),
  [setPosts]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    items: payload.posts,
    next: payload.next
  }),
  [setMorePosts]: (state, { payload }) => ({
    ...state,
    isFetchingMore: false,
    items: [...state.items, ...payload.posts],
    next: payload.next
  }),
  [setPrivateStatus]: (state, { payload }) => ({
    ...state,
    isPrivate: payload
  }),
  [deletePostFromPage]: (state, { payload }) => ({
    ...state,
    items: state.items.filter(item => item.slug !== payload)
  })
}, initialState);
