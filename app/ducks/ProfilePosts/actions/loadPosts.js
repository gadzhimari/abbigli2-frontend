import { createActions } from 'redux-actions';
import { Products } from '../../../api';

export const {
  setPosts,
  setMorePosts,
  requestPosts,
  requestMorePosts,
  setPrivateStatus
} = createActions(
  {
    SET_POSTS: (posts, next) => ({ posts, next }),
    SET_MORE_POSTS: (posts, next) => ({ posts, next }),
  },
  'REQUEST_POSTS',
  'REQUEST_MORE_POSTS',
  'SET_PRIVATE_STATUS'
);

export default function loadPosts(options) {
  const { page = 1, author } = options;

  const [requestAction, responseAction] = page === 1 ?
    [requestPosts, setPosts] :
    [requestMorePosts, setMorePosts];

  return (dispatch) => {
    dispatch(requestAction());

    return Products.getProducts({ page, author })
      .then(({ data }) => {
        dispatch(responseAction(data.results, data.next));
      })
      .catch((err) => {
        if (err.status === 403) {
          setPrivateStatus(true);
        }
      });
  };
}
