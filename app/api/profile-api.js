import request from './instance';

const Profile = {
  getData(id, isMe) {
    return request({
      url: isMe ? 'my-profile/' : `profiles/${id}/`,
      canApplyToken: true,
      mustApplyToken: isMe,
    });
  },
  getProfilePosts(isMe, userId, type, params) {
    const url = isMe ? `my-profile/${type}/` : `profiles/${userId}/${type}`;

    return request({
      url,
      params,
      canApplyToken: true,
      mustApplyToken: isMe,
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
};

export default Profile;
