import * as actions from '../actionTypes';

const appendMessages = messages => ({
  type: actions.APPEND_MESSAGES,
  messages,
});

export default appendMessages;
