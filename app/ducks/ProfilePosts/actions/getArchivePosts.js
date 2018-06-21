import { Products } from '../../../api';
import { setPosts, requestPosts } from './loadPosts';

export default function getArchivePosts(option) {
  return (dispatch) => {
    dispatch(requestPosts());

    return Products.getProducts({ ...option, status: 'archived' })
      .then(({ data }) => {
        dispatch(setPosts(data));
      });
  };
}
