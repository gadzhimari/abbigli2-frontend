import { createAction } from 'redux-actions';
import { Posts } from 'API';

export const fetchBlogsRequest =
  createAction('BLOGS_FETCH_REQUEST');
export const fetchBlogsSuccess =
  createAction('BLOGS_FETCH_SUCCESS');
export const fetchBlogsFailure = createAction('BLOGS_FETCH_FAILED');

export const changeBlogsSearchValue = createAction('BLOGS_CHANGE_SEARCH_VALUE');

export const fetchBlogs = options => async (dispatch) => {
  dispatch(fetchBlogsRequest());
  try {
    const response = await Posts.getPosts(options);
    dispatch(fetchBlogsSuccess(response.data));
  } catch (e) {
    dispatch(fetchBlogsFailure());
  }
};
