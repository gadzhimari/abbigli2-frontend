import { handleActions } from 'redux-actions';

import { addPostToBucket } from './actions/addToBucket';
import { removePostFromBucket } from './actions/removeFromBucket';

const initialState = {
  postsIds: [],
  posts: []
};

export default handleActions({
  [addPostToBucket](state, { payload }) {
    return ({
      postsIds: [...state.postsIds, payload.id],
      posts: [...state.posts, payload]
    });
  },
  [removePostFromBucket](state, { payload }) {
    return ({
      postsIds: state.postsIds.filter(id => id !== payload),
      posts: state.posts.filter(({ id }) => id !== payload)
    });
  }
}, initialState);
