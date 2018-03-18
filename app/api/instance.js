import axios from 'axios';

import { getCookie } from '../lib/cookie';
import { API_URL, API_URL_V2 } from '../config';

const API_V1 = axios.create({ baseURL: API_URL });
const API_V2 = axios.create({ baseURL: API_URL_V2 });

const getRequestHandler = instance => (options) => {
  const {
    url,
    method = 'GET',
    params = {},
    canApplyToken = false,
    mustApplyToken = false,
    token = getCookie('id_token2'),
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

export const request = getRequestHandler(API_V1);
export const requestV2 = getRequestHandler(API_V2);
