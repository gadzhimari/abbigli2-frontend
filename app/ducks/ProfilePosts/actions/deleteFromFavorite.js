import { Posts } from '../../../api';
import { deletePostFromPage } from './deletePost';

export default function deleteFromFavorite(slug) {
  return (dispatch) => {
    dispatch(deletePostFromPage(slug));
    return Posts.toggleFavorite(slug);
  };
}
