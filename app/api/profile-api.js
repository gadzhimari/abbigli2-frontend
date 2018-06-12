import request from './instance';

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
  follow(id) {
    return request({
      url: `profiles/${id}/follow/`,
      method: 'POST',
      mustApplyToken: true,
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
