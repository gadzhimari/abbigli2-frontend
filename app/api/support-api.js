import { request } from './instance';

const Support = {
  sendMessage(data) {
    return request({
      data,
      url: 'support/',
      method: 'POST',
    });
  },
};

export default Support;
