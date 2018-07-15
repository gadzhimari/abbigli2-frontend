import { createAction } from 'redux-actions';
import { Bucket } from '../../../api';

export const addPostToBucketRequest = createAction('ADD_TO_BUCKET_REQUEST');
export const addPostToBucketResponse = createAction('ADD_TO_BUCKET_RESPONSE');
export const addPostToBucketError = createAction('ADD_TO_BUCKET_ERROR');

export const addToBucket = slug => (dispatch) => {
  dispatch(addPostToBucketRequest());

  return Bucket.addToBucket(slug)
    .then(() => dispatch(addPostToBucketResponse()));
};

export const batchAddToBucket = slugs => (dispatch) => {
  dispatch(addPostToBucketRequest());

  const promises = slugs.map(
    slug => Bucket.addToBucket(slug)
      .catch(() => dispatch(addPostToBucketError()))
  );

  return Promise.all(promises)
    .then(() => dispatch(addPostToBucketResponse()));
};
