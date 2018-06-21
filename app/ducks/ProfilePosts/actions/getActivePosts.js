import { Products } from '../../../api';
import { setPosts, requestPosts } from './loadPosts';

export default function getActivePosts(option) {
  return (dispatch) => {
    dispatch(requestPosts());

    return Products.getProducts({ ...option, status: 'active' })
      .then(({ data }) => {
        dispatch(setPosts(data));
      });
  };
}
