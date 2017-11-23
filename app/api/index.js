/* eslint import/no-extraneous-dependencies: 0 */

import axios from 'axios';

import { getJsonFromStorage as getToken } from 'utils/functions';
import { API_URL, DOMAIN_URL } from 'config';


const instance = axios.create({
  baseURL: API_URL,
});

const request = (options) => {
  const {
    url,
    method = 'get',
    params = {},
    canApplyToken = false,
    mustApplyToken = false,
    token = getToken(),
    data = {},
    baseURL,
  } = options;

  if (mustApplyToken && !token) return Promise.reject();

  const config = { url, method, params, data };

  if (baseURL) {
    config.baseURL = baseURL;
  }

  if ((canApplyToken && token) || mustApplyToken) {
    config.headers = {
      Authorization: `JWT ${token}`,
    };
  }

  return instance.request(config);
};

export const Posts = {
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

export const Profile = {
  getData(id, isMe, isAuth) {
    return request({
      url: isMe ? 'my-profile/' : `profiles/${id}/`,
      canApplyToken: isAuth,
      mustApplyToken: isMe,
    });
  },
  getFollowers(id, isMe, isAuth, type) {
    return request({
      url: isMe ? `my-profile/${type}/` : `profiles/${id}/${type}/`,
      canApplyToken: isAuth,
      mustApplyToken: isMe,
    });
  },
  saveChanges(data) {
    return request({
      url: 'my-profile/',
      method: 'PATCH',
      mustApplyToken: true,
      data,
    });
  },
};

export const Tags = {
  getTags(params) {
    return request({
      url: 'tags/',
      params,
    });
  },
  getRelatedTags(tags) {
    return request({
      url: 'tags/',
      params: {
        related_tags: tags,
      },
    });
  },
};

export const Auth = {
  signUp(data) {
    return request({
      url: 'signup/',
      method: 'POST',
      data,
    });
  },
  signIn(data) {
    return request({
      url: 'api/get-token/',
      baseURL: DOMAIN_URL,
      method: 'POST',
      data,
    });
  },
  getMyProfile(token) {
    return request({
      url: 'my-profile/',
      token,
      mustApplyToken: true,
    });
  },
  resetPassword(data) {
    return request({
      url: 'reset-password/',
      method: 'POST',
      data,
    });
  },
  setPassword(data) {
    return request({
      url: 'set-password/',
      method: 'POST',
      data,
      canApplyToken: true,
    });
  },
  signUpConfirm(data) {
    return request({
      url: 'signup/confirm/',
      method: 'POST',
      data,
    });
  },
  resetPasswordConfirm(data) {
    return request({
      url: 'reset-password/confirm/',
      method: 'POST',
      data,
    });
  },
};

export const Images = {
  uploadImage(data) {
    return request({
      url: 'images/',
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  deleteImage(id) {
    return request({
      url: `images/${id}/`,
      method: 'DELETE',
      mustApplyToken: true,
    });
  },
  rotateImage(id, direction) {
    return request({
      url: `images/${id}/rotate-${direction}/`,
      method: 'POST',
      mustApplyToken: true,
    });
  },
};
