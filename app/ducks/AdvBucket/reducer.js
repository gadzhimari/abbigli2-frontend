import { handleActions } from 'redux-actions';

import { loadBucketRequest, loadBucketResponse } from './actions/loadBucket';
import { addPostToBucketRequest, addPostToBucketResponse } from './actions/addToBucket';
import { removePostFromBucket } from './actions/removeFromBucket';

const initialState = {
  isFetching: true,
  isCreating: false,
  posts: []
};

export default handleActions({
  [loadBucketRequest](state) {
    return ({
      ...state,
      isFetching: true
    });
  },
  [loadBucketResponse](state, { payload }) {
    return ({
      ...state,
      posts: payload.results,
      isFetching: false
    });
  },
  [addPostToBucketRequest](state) {
    return ({
      ...state,
      isCreating: true
    });
  },
  [addPostToBucketResponse](state) {
    return ({
      ...state,
      isCreating: false
    });
  },
  [removePostFromBucket](state, { payload }) {
    return ({
      posts: state.posts.filter(({ slug }) => slug !== payload)
    });
  }
}, initialState);
