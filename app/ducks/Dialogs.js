import { API_URL } from 'config';

import { openPopup, closePopup } from 'ducks/Popup/actions';
import { getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL + 'my-profile/dialogs/';

// Actions
const REQUEST = 'abbigli/Dialogs/REQUEST';
const RESPONSE = 'abbigli/Dialogs/RESPONSE';
const SET = 'abbigli/Dialogs/SET';
const DELETE = 'abbigli/Dialogs/DELETE';
const SET_ACTIVE = 'abbigli/Dialogs/SET_ACTIVE';
const MESSAGES_REQUEST = 'abbigli/Dialogs/MESSAGES_REQUEST';
const SET_MESSAGES = 'abbigli/Dialogs/SET_MESSAGES';
const APPEND_MESSAGES = 'abbigli/Dialogs/APPEND_MESSAGES';
const PUSH_MESSAGE = 'abbigli/Dialogs/PUSH_MESSAGE';
const MESSAGE_SENDING = 'abbigli/Dialogs/MESSAGE_SENDING';
const MESSAGE_SENDED = 'abbigli/Dialogs/MESSAGE_SENDED';
const LOAD_MORE = 'abbigli/Dialogs/LOAD_MORE';
const PRIVATE_MESSAGE = 'private message';

const initialState = {
  isFetching: true,
  isSending: false,
  dialogs: [],
  isDelete: false,
  activeDialog: null,
  messages: [],
  messagesIsFetching: false,
  isLoadingMore: false,
  next: null,
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        dialogs: action.data,
        isFetching: false,
      });
    case DELETE: {
      const newMessages = state.activeDialog == action.id
        ? []
        : state.messages;
      const newActiveDialog = state.activeDialog == action.id
        ? null
        : state.activeDialog;
      return Object.assign({}, state, {
        dialogs: state.dialogs
          .filter(item => item.id !== action.id),
        messages: newMessages,
        activeDialog: newActiveDialog,
      });
    }
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SET_ACTIVE:
      return Object.assign({}, state, {
        activeDialog: action.id,
      });
    case MESSAGES_REQUEST:
      return Object.assign({}, state, {
        messagesIsFetching: true,
        messages: [],
      });
    case SET_MESSAGES:
      return Object.assign({}, state, {
        messages: action.messages.results.reverse(),
        messagesIsFetching: false,
      });
    case MESSAGE_SENDED:
      return Object.assign({}, state, {
        isSending: false,
      });
    case MESSAGE_SENDING:
      return Object.assign({}, state, {
        isSending: true,
      });
    case LOAD_MORE:
      return Object.assign({}, state, {
        isLoadingMore: true,
      });
    case APPEND_MESSAGES: {
      const newMessages = [...action.messages.reverse(), ...state.messages];

      return Object.assign({}, state, {
        isLoadingMore: false,
        messages: newMessages,
      });
    }
    case PUSH_MESSAGE: {
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

// Action Creators
export function requestData() {
  return {
    type: REQUEST,
  };
}

export function responseData() {
  return {
    type: RESPONSE,
  };
}

export function deleteData(id) {
  return {
    type: DELETE,
    id,
  };
}

export function setData(data) {
  return {
    type: SET,
    data,
  };
}

export function setActiveDialog(id) {
  return {
    type: SET_ACTIVE,
    id,
  };
}

export function messagesRequest() {
  return {
    type: MESSAGES_REQUEST,
  };
}

export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    messages,
  };
}

export function pushMessage(message, dialogID) {
  return {
    type: PUSH_MESSAGE,
    message,
    dialogID,
  };
}

export function loadMore() {
  return {
    type: LOAD_MORE,
  };
}

export function appendMessages(messages) {
  return {
    type: APPEND_MESSAGES,
    messages,
  };
}

const messageSending = () => ({ type: MESSAGE_SENDING });
const messageSended = () => ({ type: MESSAGE_SENDED });

export function deleteDialog(id) {
  const token = getJsonFromStorage('id_token') || null;
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(deleteData(id));
    dispatch(closePopup());

    return fetch(ENDPOINT + id + '/', config);
  };
}

export function getDialogs() {
  const token = getJsonFromStorage('id_token');

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(requestData());

    return fetch(`${API_URL}my-profile/dialogs/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(setData(response));
      })
      .catch(err => console.log("Error: ", err));
  };
}

export function loadMessages(id, page = 1) {
  const token = getJsonFromStorage('id_token');
  const pageQuery = page === 1
    ? ''
    : `?page=${page}`;
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    if (page === 1) {
      dispatch(messagesRequest());
    } else {
      dispatch(loadMore());
    }

    return fetch(`${API_URL}my-profile/dialogs/${id}/${pageQuery}`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(setMessages(response));
      })
      .catch(err => console.log("Error: ", err));
  };
}

export function sendPostMessage(sender, post, message, showWants) {
  const createFormData = new FormData();
  const sendFormData = new FormData();

  createFormData.append('subject', post.title);
  createFormData.append('post', post.id);
  createFormData.append('recipient', sender);

  const createData = {
    body: createFormData,
  };
  const token = getJsonFromStorage('id_token') || null;
  const config = {
    method: 'POST',
    headers: {},
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(messageSending());

    return fetch(ENDPOINT, Object.assign(config, createData))
      .then(res => res.json())
      .then((response) => {
        sendFormData.append('body', message);

        return fetch(response.url, Object.assign(config, { body: sendFormData }))
          .then((res) => {
            if (res) {
              dispatch(messageSended());
              showWants(false);
              dispatch(openPopup('statusPopup', {
                title: 'Message have been successfully sent',
              }));
            }
          });
      });
  };
}

export function sendPrivateMessage(sender, message, dialogID) {
  const formData = new FormData();
  const createDialogData = new FormData();

  formData.append('body', message.body);
  createDialogData.append('subject', PRIVATE_MESSAGE);
  createDialogData.append('recipient', sender);

  const createData = {
    body: createDialogData,
  };
  const sendData = {
    body: formData,
  };

  const token = getJsonFromStorage('id_token') || null;
  const config = {
    method: 'POST',
    headers: {},
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    if (dialogID) {
      dispatch(pushMessage(message, dialogID));

      return fetch(`${API_URL}my-profile/dialogs/${dialogID}/`, Object.assign(config, sendData));
    }

    dispatch(messageSending());

    return fetch(`${API_URL}my-profile/dialogs/`, Object.assign(config, createData))
      .then(res => res.json())
      .then(response => fetch(response.url, Object.assign(config, sendData))
        .then(() => {
          dispatch(openPopup('statusPopup', {
            title: 'Message have been successfully sent',
          }));
          dispatch(messageSended());
        })
      );
  };
}
