import { handleActions } from 'redux-actions';

import * as newPostsActions from './actions/fetchNewPosts';
import * as popularPostsActions from './actions/fetchPopular';
import * as relativePostsActions from './actions/fetchRelativePost';
import * as postActions from './actions/fetchPost';
import * as usersPostsActions from './actions/fetchUsersPosts';
import resetPost from './actions/resetPost';
import * as bookmarksActions from './actions/bookmarks';
import { updateFollow } from './actions/setFollow';
import { updateFavorite } from './actions/toggleFavorite';

const initialState = {
  isFetchingPost: true,
  isFetchingPopular: true,
  isFetchingNew: true,
  isFetchingRelative: true,
  isFetchingUsersPosts: true,
  isFetchingBookmarks: false,
  post: {},
  author: {},
  popularPosts: [],
  newPosts: [],
  relativePosts: [],
  usersPosts: [],
  isDefined: true,
};

export default handleActions({
  [newPostsActions.requestNewPosts](state) {
    return {
      ...state,
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
  [relativePostsActions.requestRelativePosts](state) {
    return {
      ...state,
      isFetchingRelative: true
    };
  },
  [relativePostsActions.responseRelativePosts](state, { payload }) {
    return {
      ...state,
      isFetchingRelative: false,
      relativePosts: payload
    };
  },
  [relativePostsActions.failureRelativePosts](state) {
    return {
      ...state,
      isFetchingRelative: false,
    };
  },
  [usersPostsActions.requestUsersPosts](state) {
    return {
      ...state,
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
  [postActions.postFailure](state) {
    return {
      ...state,
      isFetchingPost: false,
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
