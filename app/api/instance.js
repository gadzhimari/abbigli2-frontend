import axios from 'axios';

import { getCookie } from '../lib/cookie';
import { API_URL } from '../config';

const instance = axios.create({
  baseURL: API_URL,
});

const request = (options) => {
  const {
    url,
    method = 'GET',
    params = {},
    canApplyToken = false,
    mustApplyToken = false,
    token = getCookie('id_token'),
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

export default request;
