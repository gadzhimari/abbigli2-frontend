import { createAction } from 'redux-actions';

export const addPostToBucket = createAction('ADD_TO_BUCKET');

const addToBucket = post => (dispatch) => {
  dispatch(addPostToBucket(post));

  console.log(`Adding to bucket post "${post.title}"`);
};

export default addToBucket;
