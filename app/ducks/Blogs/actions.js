import { createActions } from 'redux-actions';
import { Posts } from '../../api';

export const {
  fetchBlogsRequest,
  fetchBlogsSuccess,
  fetchBlogsFailure,
  changeBlogsSearchValue
} = createActions(
  'FETCH_BLOGS_REQUEST',
  'FETCH_BLOGS_SUCCESS',
  'FETCH_BLOGS_FAILED',
  'CHANGE_BLOGS_SEARCH_VALUE'
);
export const fetchBlogs = options => async (dispatch) => {
  dispatch(fetchBlogsRequest());
  try {
    const response = await Posts.getPosts(options);
    dispatch(fetchBlogsSuccess(response.data));
  } catch (e) {
    dispatch(fetchBlogsFailure());
  }
};
