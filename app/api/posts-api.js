import { requestV2 } from './instance';

export default {
  getPosts(params) {
    return requestV2({
      url: '/posts/',
      params,
      canApplyToken: true
    });
  },
  getPostsCategories() {
    return requestV2({
      url: '/posts/categories/',
      canApplyToken: true
    });
  },
  getPost(slug, token) {
    return requestV2({
      url: `/posts/${slug}/`,
      canApplyToken: true,
      token
    });
  },
  likePost(slug) {
    return requestV2({
      method: 'POST',
      url: `/posts/${slug}/like/`,
      mustApplyToken: true,
    });
  },
  createPost(data) {
    return requestV2({
      url: '/posts/',
      mustApplyToken: true,
      method: 'POST',
      data,
    });
  },
  editPost(data, slug) {
    return requestV2({
      url: `/posts/${slug}/`,
      mustApplyToken: true,
      method: 'PATCH',
      data,
    });
  },
  deletePost(slug) {
    return requestV2({
      url: `/posts/${slug}/`,
      mustApplyToken: true,
      method: 'DELETE',
    });
  },
  getSimilarPosts(slug) {
    return requestV2({
      url: `/posts/${slug}/similar/`,
      canApplyToken: true,
    });
  },
  createComment(slug, data) {
    return requestV2({
      url: `/posts/${slug}/comments/`,
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  getComments(slug) {
    return requestV2({
      url: `/posts/${slug}/comments/`,
      canApplyToken: true,
    });
  }
};
