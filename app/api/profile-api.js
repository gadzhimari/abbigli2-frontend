import request from './instance';

const Profile = {
  getData(id, isMe, isAuth) {
    return request({
      url: isMe ? 'my-profile/' : `profiles/${id}/`,
      canApplyToken: isAuth,
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
