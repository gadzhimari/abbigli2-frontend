import { createAction } from 'redux-actions';

export const removePostFromBucket = createAction('REMOVE_POST_FROM_BUCKET');

const removeFromBucket = id => (dispatch) => {
  dispatch(removePostFromBucket(id));

  console.log(`Deliting from bucket post with id ${id}`);
};

export default removeFromBucket;
