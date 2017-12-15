import request from './instance';

const Posts = {
  getPosts(params) {
    return request({
      url: 'posts/',
      params,
      canApplyToken: true,
    });
  },
  getPost(slug, token) {
    return request({
      url: `posts/${slug}/`,
      canApplyToken: true,
      token,
    });
  },
  getSimilarPosts(slug) {
    return request({
      url: `posts/${slug}/similar/`,
      canApplyToken: true,
    });
  },
  getUsersPosts(userId, params) {
    return request({
      url: `profiles/${userId}/posts/`,
      params,
      canApplyToken: true,
    });
  },
  toggleFavorite(slug) {
    return request({
      url: `posts/${slug}/favorite/`,
      mustApplyToken: true,
    });
  },
};

export default Posts;
