import { createAction } from 'redux-actions';
import { Bucket } from '../../../api';

export const loadBucketRequest = createAction('LOAD_BUCKET_REQUEST');
export const loadBucketResponse = createAction('LOAD_BUCKET_RESPONSE');
export const loadBucketError = createAction('LOAD_BUCKET_ERROR');

const loadBucket = options => (dispatch, getState) => {
  const { Auth } = getState();
  const author = Auth.me.id;

  dispatch(loadBucketRequest());

  return Bucket.loadBucket(author, options)
    .then(({ data }) => dispatch(loadBucketResponse(data)));
};

export default loadBucket;
