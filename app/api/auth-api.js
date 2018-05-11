import request from './instance';
import { DOMAIN_URL } from '../config';

const Auth = {
  signUp(data) {
    return request({
      url: 'api/v1/signup/',
      baseURL: 'http://alpha.abbigli.com',
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
      url: 'my-profile/set-password/',
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
  oauth(network, data) {
    return request({
      baseURL: DOMAIN_URL,
      url: `api/social/${network}/`,
      method: 'POST',
      data
    });
  }
};

export default Auth;
