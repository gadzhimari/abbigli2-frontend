import { handleActions } from 'redux-actions';

import * as newPostsActions from './actions/fetchNewPosts';
import * as popularPostsActions from './actions/fetchPopular';
import * as similarPostsActions from './actions/fetchSimilarPost';
import * as postActions from './actions/fetchPost';
import * as usersPostsActions from './actions/fetchUsersPosts';
import resetPost from './actions/resetPost';
import * as bookmarksActions from './actions/bookmarks';
import { updateFollow } from './actions/setFollow';
import { updateFavorite } from './actions/toggleFavorite';

const SIMILAR_POSTS_COUNT = 8;

const initialState = {
  isFetchingPost: true,
  isFetchingPopular: true,
  isFetchingNew: true,
  isFetchingSimilar: true,
  isFetchingUsersPosts: true,
  isFetchingBookmarks: false,
  post: {},
  author: {},
  popularPosts: [],
  newPosts: [],
  similarPosts: [],
  usersPosts: [],
  isDefined: true,
};

export default handleActions({
  [newPostsActions.requestNewPosts](state) {
    return {
      ...state,
      newPosts: [],
      isFetchingNew: true
    };
  },
  [newPostsActions.responseNewPosts](state, { payload }) {
    return {
      ...state,
      isFetchingNew: false,
      newPosts: payload
    };
  },
  [newPostsActions.failureNewPosts](state) {
    return {
      ...state,
      isFetchingNew: false,
    };
  },
  [popularPostsActions.requestPopularPosts](state) {
    return {
      ...state,
      popularPosts: [],
      isFetchingPopular: true
    };
  },
  [popularPostsActions.responsePopularPosts](state, { payload }) {
    return {
      ...state,
      isFetchingPopular: false,
      popularPosts: payload
    };
  },
  [popularPostsActions.failurePopularPosts](state) {
    return {
      ...state,
      isFetchingPopular: false,
    };
  },
  [similarPostsActions.requestSimilarPosts](state) {
    return {
      ...state,
      similarPosts: [],
      isFetchingSimilar: true
    };
  },
  [similarPostsActions.responseSimilarPosts](state, { payload }) {
    return {
      ...state,
      isFetchingSimilar: false,
      similarPosts: payload.slice(0, SIMILAR_POSTS_COUNT),
    };
  },
  [similarPostsActions.failureSimilarPosts](state) {
    return {
      ...state,
      isFetchingSimilar: false,
    };
  },
  [usersPostsActions.requestUsersPosts](state) {
    return {
      ...state,
      usersPosts: [],
      isFetchingUsersPosts: true
    };
  },
  [usersPostsActions.responseUsersPosts](state, { payload }) {
    return {
      ...state,
      isFetchingUsersPosts: false,
      usersPosts: payload
    };
  },
  [usersPostsActions.failureUsersPosts](state) {
    return {
      ...state,
      isFetchingUsersPosts: false,
    };
  },
  [postActions.postRequest](state) {
    return {
      ...state,
      isFetchingPost: true
    };
  },
  [postActions.postResponse](state, { payload }) {
    return {
      ...state,
      isFetchingPost: false,
      post: payload,
      author: payload.author
    };
  },
  [resetPost]() {
    return initialState;
  },
  [bookmarksActions.requestBookmarks](state) {
    return {
      ...state,
      isFetchingBookmarks: true
    };
  },
  [bookmarksActions.addingBookmark](state, { payload }) {
    return {
      ...state,
      isFetchingBookmarks: false,
      post: {
        ...state.post,
        bookmark_id: payload.id
      }
    };
  },
  [bookmarksActions.delitingBookmark](state) {
    return {
      ...state,
      isFetchingBookmarks: false,
      post: {
        ...state.post,
        bookmark_id: null
      }
    };
  },
  [bookmarksActions.failureBookmark](state) {
    return {
      ...state,
      isFetchingBookmarks: false
    };
  },
  [updateFollow](state) {
    return {
      ...state,
      author: {
        ...state.author,
        is_subscribed: !state.author.is_subscribed,
      }
    };
  },
  [updateFavorite](state) {
    return {
      ...state,
      post: {
        ...state.post,
        is_favorite: !state.post.is_favorite
      }
    };
  }
}, initialState);
