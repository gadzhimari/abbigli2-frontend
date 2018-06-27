import { request } from './instance';
import { pageSize } from '../lib/calculatePagesCount';

export default {
  createBookmark(postType, postID) {
    return request({
      url: '/my-profile/bookmarks/',
      method: 'POST',
      data: {
        type: postType,
        object_id: postID
      },
      mustApplyToken: true
    });
  },
  deleteBookmark(bookmarkId) {
    return request({
      url: `/my-profile/bookmarks/${bookmarkId}/`,
      method: 'DELETE',
      mustApplyToken: true
    });
  },
  getBookmarks(isMe, id, params) {
    const url = isMe ? '/my-profile/bookmarks/' : `/profiles/${id}/bookmarks/`;
    return request({
      url,
      params: {
        page_size: pageSize,
        ...params
      },
      mustApplyToken: true
    });
  }
};
