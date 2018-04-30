import { request } from './instance';

export default {
  getUsers(params) {
    return request({
      url: 'profiles/',
      canApplyToken: true,
      params
    });
  }
};
