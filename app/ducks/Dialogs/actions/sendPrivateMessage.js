import { Dialogs } from 'API';
import * as actions from '../actionTypes';
import { openPopup } from 'ducks/Popup/actions';
import messageSending from './messageSending';
import messageSended from './messageSended';

const pushMessage = (message, dialogID) => ({
  type: actions.PUSH_MESSAGE,
  message,
  dialogID,
});

const sendPrivateMessage = (sender, message, dialogID, canShowPopup = true) => async (dispatch) => {
  const data = {
    subject: actions.PRIVATE_MESSAGE,
    recipient: sender,
  };

  const messageData = {
    body: message.body,
  };

  if (dialogID) {
    dispatch(pushMessage(message, dialogID));

    await Dialogs.sendMessage(dialogID, messageData);
    return;
  }

  dispatch(messageSending());

  try {
    const response = await Dialogs.createDialog(data);
    await Dialogs.sendMessage(response.data.id, messageData);
    if (canShowPopup) {
      dispatch(openPopup('statusPopup', {
        title: 'Message have been successfully sent',
      }));
    }
    dispatch(messageSended());
  } catch (e) {
    console.log(e);
  }
};

export default sendPrivateMessage;
