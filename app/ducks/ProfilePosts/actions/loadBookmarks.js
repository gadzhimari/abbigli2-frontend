import { Bookmarks } from '../../../api';

import {
  setPosts,
  setMorePosts,
  requestPosts,
  requestMorePosts,
  setPrivateStatus
} from './loadPosts';

export default function loadBookmarks(options) {
  const { isMe, page = 1, profileId } = options;
  const params = { page };

  const [requestAction, responseAction] = page === 1 ?
    [requestPosts, setPosts] :
    [requestMorePosts, setMorePosts];

  return (dispatch) => {
    dispatch(requestAction());

    return Bookmarks.getBookmarks(isMe, profileId, params)
      .then(({ data }) => {
        dispatch(responseAction(data.results.map(item => item.object), data.next));
      })
      .catch((err) => {
        if (err.status === 403) {
          setPrivateStatus(true);
        }
      });
  };
}
