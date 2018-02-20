import * as actions from './actionTypes';

const initialState = {
  isFetching: false,
  isSending: false,
  dialogs: [],
  isDelete: false,
  activeDialog: null,
  messages: [],
  messagesIsFetching: false,
  isLoadingMore: false,
  next: null,
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET:
      return Object.assign({}, state, {
        dialogs: action.data,
        isFetching: false,
      });
    case actions.DELETE: {
      const newMessages = state.activeDialog === action.id
        ? []
        : state.messages;
      const newActiveDialog = state.activeDialog === action.id
        ? null
        : state.activeDialog;
      return Object.assign({}, state, {
        dialogs: state.dialogs
          .filter(item => item.id !== action.id),
        messages: newMessages,
        activeDialog: newActiveDialog,
      });
    }
    case actions.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case actions.RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case actions.SET_ACTIVE:
      return Object.assign({}, state, {
        activeDialog: action.id,
      });
    case actions.MESSAGES_REQUEST:
      return Object.assign({}, state, {
        messagesIsFetching: true,
        messages: [],
      });
    case actions.SET_MESSAGES:
      return Object.assign({}, state, {
        messages: action.messages.results.reverse(),
        messagesIsFetching: false,
      });
    case actions.MESSAGE_SENDED:
      return Object.assign({}, state, {
        isSending: false,
      });
    case actions.MESSAGE_SENDING:
      return Object.assign({}, state, {
        isSending: true,
      });
    case actions.LOAD_MORE:
      return Object.assign({}, state, {
        isLoadingMore: true,
      });
    case actions.APPEND_MESSAGES: {
      const newMessages = [...action.messages.reverse(), ...state.messages];

      return Object.assign({}, state, {
        isLoadingMore: false,
        messages: newMessages,
      });
    }
    case actions.PUSH_MESSAGE: {
      const newMessages = [...state.messages];
      const newDialogs = state.dialogs.map((dialog) => {
        if (dialog.id === action.dialogID) {
          dialog.last_message_text = action.message.body;
          dialog.last_message_sent = action.message.temp_sent_at;
        }

        return dialog;
      });
      newMessages.push(action.message);

      return Object.assign({}, state, {
        messages: newMessages,
        dialogs: newDialogs,
      });
    }
    default:
      return state;
  }
}
