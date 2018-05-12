import { createAction } from 'redux-actions';
import { Posts, Products, Events } from '../../api';

const apiByType = {
  post: Posts,
  product: Products,
  event: Events
};

export const fetchCommentsRequest =
  createAction('COMMENTS_FETCH_REQUEST');
export const fetchCommentsSuccess =
  createAction('COMMENTS_FETCH_SUCCESS');
export const fetchCommentsFailure = createAction('COMMENTS_FETCH_FAILED');

export const sendCommentRequest =
  createAction('COMMENTS_SEND_REQUEST');
export const sendCommentSuccess =
  createAction('COMMENTS_SEND_SUCCESS');
export const sendCommentFailure = createAction('COMMENTS_SEND_FAILED');

export const fetchComments = (postType, slug) => async (dispatch) => {
  dispatch(fetchCommentsRequest());
  try {
    const api = apiByType[postType];
    const response = await api.getComments(slug);
    dispatch(fetchCommentsSuccess({ comments: response.data.results }));
  } catch (e) {
    dispatch(fetchCommentsFailure());
  }
};

export const sendComment = (postType, data) => async (dispatch) => {
  dispatch(sendCommentRequest());
  try {
    const api = apiByType[postType];

    const response = await api.createComment(data.slug, data);
    dispatch(sendCommentSuccess({ comment: response.data }));
  } catch (e) {
    dispatch(sendCommentFailure());
  }
};
