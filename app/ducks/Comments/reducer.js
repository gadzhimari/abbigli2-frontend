import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from './actions';

const commentsFetchingState = handleActions({
  [actions.fetchCommentsRequest]() {
    return true;
  },
  [actions.fetchCommentsSuccess]() {
    return false;
  },
  [actions.fetchCommentsFailure]() {
    return false;
  },
}, false);

const commentSendingState = handleActions({
  [actions.sendCommentRequest]() {
    return true;
  },
  [actions.sendCommentSuccess]() {
    return false;
  },
  [actions.sendCommentFailure]() {
    return false;
  },
}, false);

const comments = handleActions({
  [actions.fetchCommentsSuccess](state, { payload }) {
    return payload.comments;
  },
  [actions.sendCommentSuccess](state, { payload: { comment } }) {
    return [comment, ...state];
  },
}, []);

export default combineReducers({
  commentsFetchingState,
  commentSendingState,
  comments,
});
