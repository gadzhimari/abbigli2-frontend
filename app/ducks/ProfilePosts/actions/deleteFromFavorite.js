import { Bookmarks } from '../../../api';
import { deletePostFromPage } from './deletePost';

export default function deleteFromFavorite(id) {
  return (dispatch) => {
    dispatch(deletePostFromPage(id));
    return Bookmarks.deleteBookmark(id);
  };
}
