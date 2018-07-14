import { request } from './instance';

const Comments = {
  getComments(slug) {
    return request({
      url: `posts/${slug}/comments/`,
      mustApplyToken: true,
    });
  },
  sendComment(slug, data) {
    return request({
      url: `posts/${slug}/comments/`,
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
};

export default Comments;
