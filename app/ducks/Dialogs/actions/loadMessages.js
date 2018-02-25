import { Dialogs } from 'API';
import * as actions from '../actionTypes';

const messagesRequest = () => ({
  type: actions.MESSAGES_REQUEST,
});

const loadMore = () => ({
  type: actions.LOAD_MORE,
});

const setMessages = messages => ({
  type: actions.SET_MESSAGES,
  messages,
});

const loadMessages = (id, page = 1) => async (dispatch) => {
  let params;
  if (page === 1) {
    dispatch(messagesRequest());
    params = {};
  } else {
    dispatch(loadMore());
    params = {
      page,
    };
  }

  try {
    const response = await Dialogs.getMessages(id, params);
    dispatch(setMessages(response.data));
  } catch (e) {
    console.log(e);
  }
};

export default loadMessages;
