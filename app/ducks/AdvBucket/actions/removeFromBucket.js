import { createAction } from 'redux-actions';
import { Bucket } from '../../../api';

export const removePostFromBucket = createAction('REMOVE_POST_FROM_BUCKET');

const removeFromBucket = slug => (dispatch) => {
  dispatch(removePostFromBucket(slug));

  return Bucket.removeFromBucket(slug);
};

export default removeFromBucket;
