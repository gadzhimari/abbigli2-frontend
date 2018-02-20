import request from './instance';

const Dialogs = {
  createDialog(data) {
    return request({
      url: 'my-profile/dialogs/',
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  getDialogs() {
    return request({
      url: 'my-profile/dialogs/',
      mustApplyToken: true,
    });
  },
  deleteDialog(id) {
    return request({
      url: `my-profile/dialogs/${id}/`,
      method: 'DELETE',
      mustApplyToken: true,
    });
  },
  getMessages(id, params) {
    return request({
      url: `my-profile/dialogs/${id}/`,
      params,
      mustApplyToken: true,
    });
  },
  sendMessage(id, data) {
    return request({
      url: `my-profile/dialogs/${id}/`,
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
};

export default Dialogs;
