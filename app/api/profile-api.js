import { request } from './instance';

const Profile = {
  getData(id, isMe) {
    return request({
      url: isMe ? 'my-profile/' : `profiles/${id}/`,
      canApplyToken: true,
      mustApplyToken: isMe,
    });
  },
  getProfilePosts(userId, type, params) {
    return request({
      url: `profiles/${userId}/${type}`,
      params,
      canApplyToken: true,
    });
  },
  getFeed(params) {
    return request({
      url: 'my-profile/feed/',
      params,
      mustApplyToken: true
    });
  },
  getFollowers(id, isMe, isAuth, type, params) {
    return request({
      url: isMe ? `my-profile/${type}/` : `profiles/${id}/${type}/`,
      canApplyToken: isAuth,
      mustApplyToken: isMe,
      params,
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
  addContact(data) {
    return request({
      url: 'my-profile/contacts/',
      method: 'POST',
      mustApplyToken: true,
      data,
    });
  },
  deleteContact(id) {
    return request({
      url: `my-profile/contacts/${id}/`,
      method: 'DELETE',
      mustApplyToken: true,
    });
  },
  partialUpdateContact(id, data) {
    return request({
      url: `my-profile/contacts/${id}/`,
      method: 'PATCH',
      mustApplyToken: true,
      data,
    });
  },
  follow(id) {
    return request({
      url: `profiles/${id}/follow/`,
      method: 'POST',
      mustApplyToken: true,
    });
  },
  search(search) {
    return request({
      url: 'profiles/',
      canApplyToken: true,
      params: { search }
    });
  },
  getActivePosts(userId, params) {
    return request({
      url: `profiles/${userId}/posts`,
      params,
      canApplyToken: true,
    });
  },
  getArchivePosts(userId, params) {
    return request({
      url: `profiles/${userId}/posts`,
      params,
      canApplyToken: true,
    });
  }
};

export default Profile;
