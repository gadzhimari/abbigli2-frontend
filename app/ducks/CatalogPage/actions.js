import { createActions } from 'redux-actions';

import { Products, Tags, Catalog } from '../../api';
import { setNetworkError } from '../NetworkErrors/reducer';
import { PRODUCT_TYPE } from '../../lib/constants/posts-types';

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

  return Products.getProducts(options)
    .then(res => dispatch(responsePosts(res.data)));
};

export const fetchTags = options => (dispatch) => {
  dispatch(requestTags());

  return Tags.getTags({ ...options, type: `${PRODUCT_TYPE}s` })
    .then(res => dispatch(responseTags(res.data)));
};

export const fetchMoreTags = options => (dispatch) => {
  dispatch(requestMoreTags());

  return Tags.getTags({ ...options, type: `${PRODUCT_TYPE}s` })
    .then(res => dispatch(responseMoreTags(res.data)));
};

export const fetchCrumbs = options => dispatch => Catalog.getCategoryCrumbs(options)
  .then((res) => {
    dispatch(setCurrentCategoryTree(res.data));
  })
  .catch(({ response }) => {
    dispatch(setNetworkError(response));
  });
