import req from './instance';

const Support = {
  sendMessage(data) {
    return req({
      data,
      url: 'support/',
      method: 'POST',
    });
  },
};

export default Support;
