import { createActions } from 'redux-actions';

import { Posts, Tags, Catalog } from '../../api';
import { setNetworkError } from '../NetworkErrors/reducer';

export const {
  responsePosts,
  requestTags,
  responseMoreTags,
  requestPosts,
  responseTags,
  requestMoreTags,
  setCurrentCategoryTree
} = createActions(
  'RESPONSE_POSTS',
  'RESPONSE_TAGS',
  'RESPONSE_MORE_TAGS',
  'REQUEST_POSTS',
  'REQUEST_TAGS',
  'RESPONSE_TAGS',
  'REQUEST_MORE_TAGS',
  'SET_CURRENT_CATEGORY_TREE'
);

// TODO: new api
export const fetchPosts = options => (dispatch) => {
  dispatch(requestPosts());

  return Posts.getPosts({ type: 1, ...options })
    .then(res => dispatch(responsePosts(res.data)));
};

export const fetchTags = options => (dispatch) => {
  dispatch(requestTags());

  return Tags.getTags(options)
    .then(res => dispatch(responseTags(res.data)));
};

export const fetchMoreTags = options => (dispatch) => {
  dispatch(requestMoreTags());

  return Tags.getTags(options)
    .then(res => dispatch(responseMoreTags(res.data)));
};

export const fetchCrumbs = options => dispatch => Catalog.getCategoryCrumbs(options)
  .then((res) => {
    dispatch(setCurrentCategoryTree(res.data));
  })
  .catch(({ response }) => {
    dispatch(setNetworkError(response));
  });
