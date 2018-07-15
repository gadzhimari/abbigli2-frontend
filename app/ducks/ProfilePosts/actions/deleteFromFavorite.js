import { toggleLike } from '../../Like/actions';
import { deletePostFromPage } from './deletePost';

export default function deleteFromFavorite(slug, type) {
  return (dispatch) => {
    dispatch(deletePostFromPage(slug));
    return dispatch(toggleLike(slug, type));
  };
}
