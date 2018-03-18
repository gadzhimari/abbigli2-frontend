import { createActions } from 'redux-actions';
import { Posts } from '../../../api';

export const {
  deletePostFromPage
} = createActions('DELETE_POST_FROM_PAGE');

// TODO: new api
export default function deletePost(slug) {
  return (dispatch) => {
    dispatch(deletePostFromPage(slug));
    return Posts.deletePost(slug);
  };
}
