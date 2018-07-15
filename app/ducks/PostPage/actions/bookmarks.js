import { createActions } from 'redux-actions';

import { Bookmarks } from '../../../api';

import onlyAuthAction from '../../../lib/redux/onlyAuthAction';

export const {
  requestBookmarks,
  addingBookmark,
  delitingBookmark,
  failureBookmark
} = createActions(
  'REQUEST_BOOKMARKS',
  'ADDING_BOOKMARK',
  'DELITING_BOOKMARK',
  'FAILURE_BOOKMARK'
);

const addToBookmark = (postType, postId) => async (dispatch) => {
  dispatch(requestBookmarks());

  try {
    const res = await Bookmarks.createBookmark(postType, postId);
    dispatch(addingBookmark(res.data));
  } catch (e) {
    dispatch(failureBookmark());
  }
};

const deleteFromBookmark = bookmarkId => async (dispatch) => {
  dispatch(requestBookmarks());

  try {
    await Bookmarks.deleteBookmark(bookmarkId);
    dispatch(delitingBookmark());
  } catch (e) {
    dispatch(failureBookmark());
  }
};

export const addBookmark = onlyAuthAction(addToBookmark);
export const deleteBookmark = onlyAuthAction(deleteFromBookmark);
