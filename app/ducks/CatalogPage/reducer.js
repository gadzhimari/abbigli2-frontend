import { handleActions } from 'redux-actions';

import {
  requestPosts,
  responsePosts,
  requestTags,
  responseTags,
  requestMoreTags,
  responseMoreTags,
  setCurrentCategoryTree
} from './actions';

const initialState = {
  isFetchingPosts: true,
  isFetchingTags: true,
  isFetchingMoreTags: false,
  posts: [],
  tags: [],
  postPagesCount: 0,
  nextTagsPage: 1,
  tree: []
};

export default handleActions({
  [requestPosts](state) {
    return {
      ...state,
      isFetchingPosts: true
    };
  },
  [responsePosts](state, { payload }) {
    return {
      ...state,
      isFetchingPosts: false,
      posts: payload.results,
      postPagesCount: Math.ceil(payload.count / 30),
    };
  },
  [requestTags](state) {
    return {
      ...state,
      isFetchingTags: true,
    };
  },
  [responseTags](state, { payload }) {
    return {
      ...state,
      isFetchingTags: false,
      tags: payload.results,
      nextTagsPage: payload.next && (state.nextTagsPage + 1),
    };
  },
  [requestMoreTags](state) {
    return {
      ...state,
      isFetchingMoreTags: true
    };
  },
  [responseMoreTags](state, { payload }) {
    return {
      ...state,
      isFetchingMoreTags: false,
      tags: [...state.tags, ...payload.tags],
      nextTagsPage: payload.next && (state.nextTagsPage + 1),
    };
  },
  [setCurrentCategoryTree](state, { payload }) {
    return {
      ...state,
      tree: payload.crumbs
    };
  }
}, initialState);
