import { Bookmarks } from '../../../api';

import {
  setPosts,
  requestPosts,
  setPrivateStatus
} from './loadPosts';

export default function loadBookmarks(options) {
  const { isMe, page = 1, author } = options;
  const params = { page };

  return (dispatch) => {
    dispatch(requestPosts());

    return Bookmarks.getBookmarks(isMe, author, params)
      .then(({ data }) => {
        dispatch(setPosts({
          ...data,
          results: data.results.map(item => item.object)
        }));
      })
      .catch((err) => {
        if (err.status === 403) {
          setPrivateStatus(true);
        }
      });
  };
}
