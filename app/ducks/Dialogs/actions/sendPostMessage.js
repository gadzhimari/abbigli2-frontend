import { Dialogs } from '../../../api';
import { openPopup } from '../../Popup/actions';

import messageSending from './messageSending';
import messageSended from './messageSended';
import { __t } from '../../../i18n/translator';

const sendPostMessage = (sender, post, message) => async (dispatch) => {
  const postData = {
    subject: post.title,
    post: post.id,
    recipient: sender,
  };

  dispatch(messageSending());

  try {
    const response = await Dialogs.createDialog(postData);
    await Dialogs.sendMessage(response.data.id, { body: message });
    dispatch(openPopup('statusPopup', {
      title: __t('message.success')
    }));
    dispatch(messageSended());
  } catch (e) {
    console.log(e);
  }
};

export default sendPostMessage;
