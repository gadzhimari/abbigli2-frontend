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
      url: 'api/auth/get-token/',
      baseURL: 'http://alpha.abbigli.com',
      method: 'POST',
      data,
    });
  },
  getMyProfile(token) {
    return request({
      url: 'api/v1/my-profile/',
      baseURL: 'http://alpha.abbigli.com',
      token,
      mustApplyToken: true,
    });
  },
  resetPassword(data) {
    return request({
      url: 'api/v1/reset-password/',
      baseURL: 'http://alpha.abbigli.com',
      method: 'POST',
      data,
    });
  },
  setPassword(data) {
    return request({
      url: 'api/v1/my-profile/set-password/',
      baseURL: 'http://alpha.abbigli.com',
      method: 'POST',
      data,
      canApplyToken: true,
    });
  },
  signUpConfirm(data) {
    return request({
      url: 'api/v1/signup/confirm/',
      baseURL: 'http://alpha.abbigli.com',
      method: 'POST',
      data,
    });
  },
  resetPasswordConfirm(data) {
    return request({
      url: 'api/v1/reset-password/confirm/',
      baseURL: 'http://alpha.abbigli.com',
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
