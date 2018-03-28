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
  tree: [],
  promo: [],
  currentCategory: {},
};

const getCurrentCategory = (categories) => {
  const category = categories[categories.length - 1];
  return {
    ...category,
    children: category.children.filter(item => item.posts_num !== 0)
  };
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
      tags: [...state.tags, ...payload.results],
      nextTagsPage: payload.next && (state.nextTagsPage + 1),
    };
  },
  [setCurrentCategoryTree](state, { payload: { crumbs, promo } }) {
    return {
      ...state,
      tree: crumbs,
      promo,
      currentCategory: getCurrentCategory(crumbs)
    };
  }
}, initialState);
