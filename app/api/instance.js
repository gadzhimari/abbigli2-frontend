import axios from 'axios';

import { getJsonFromStorage as getToken } from '../utils/functions';
import { API_URL } from '../config';

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

export default request;
