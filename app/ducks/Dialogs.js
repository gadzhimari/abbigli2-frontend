import { API_URL } from 'config';
import { messagePopup, statusPopup, wantsPopup, deleteMessagePopup } from 'ducks/Popup'
import { getJsonFromStorage } from 'utils/functions';

const ENDPOINT = API_URL+'my-profile/dialogs/';

// Actions
const REQUEST = 'abbigli/Dialogs/REQUEST';
const RESPONSE = 'abbigli/Dialogs/RESPONSE';
const SET = 'abbigli/Dialogs/SET';
const DELETE = 'abbigli/Dialogs/DELETE';
const SET_ACTIVE = 'abbigli/Dialogs/SET_ACTIVE';
const MESSAGES_REQUEST = 'abbigli/Dialogs/MESSAGES_REQUEST';
const SET_MESSAGES = 'abbigli/Dialogs/SET_MESSAGES';
const PRIVATE_MESSAGE = 'private message';

const initialState = {
  isFetching: true,
  dialogs: [],
  isDelete: false,
  activeDialog: null,
  messages: [],
  messagesIsFetching: false,
};

// Reducer
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        dialogs: action.data,
        isFetching: false,
      });
    case DELETE:
      return Object.assign({}, state, {
        isDelete: true,
      });
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
        messages: action.messages,
        messagesIsFetching: false,
      });
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

export function deleteData(deleted = true) {
  return {
    type: RESPONSE,
    deleted,
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
    dispatch(requestData());

    return fetch(ENDPOINT + id + '/', config)
    .then(() => {
      dispatch(deleteMessagePopup(false));
      dispatch(responseData());
      dispatch(deleteData());
    });
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

export function loadMessages(id) {
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
    dispatch(messagesRequest());

    return fetch(`${API_URL}my-profile/dialogs/${id}/`, config)
      .then(res => res.json())
      .then((response) => {
        dispatch(setMessages(response.results.reverse()));
      })
      .catch(err => console.log("Error: ", err));
  };
}

export function sendPostMessage(sender, post, message) {
  let create_data = {body: `subject=${post.title}&recipient=${sender}&post=${post.id}`}

  let senderId = sender || localStorage.getItem('id')
  let token = getJsonFromStorage('id_token') || null;
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }
    if(token){config.headers.Authorization = `JWT ${token}`;}
  return dispatch => {

    dispatch(requestData());

    return fetch(ENDPOINT, Object.assign(config, create_data))
      .then(res => res.json())
      .then((response) => {
        if(response){

          var msg = ['<span class="title-message"><a href="', response.post.url,
            '">',
            response.post.title,
            '</a></span><br><span class="price">',
            response.post.price,
            ' ',
            'руб.', '</span> <br>', message, '<br/><img src="' + 'https://abbigli.com/thumbs/unsafe/0x196/' + response.post.image + '"/>'].join('');

          return fetch(response.url, Object.assign(config, {body: `body=${msg}`}))
            .then(res => res.json())
            .then(response => {
              if(response){
                dispatch(responseData())
                dispatch(wantsPopup(false))
                dispatch(statusPopup(true))
              }
            }).catch(err => console.log("Error: ", err))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function sendPrivateMessage(sender, message) {

  let create_data = {body: `subject=${PRIVATE_MESSAGE}&recipient=${sender}`}
  let send_data = {body: `body=${message}`}

  let token = getJsonFromStorage('id_token') || null;
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }
    if(token){config.headers.Authorization = `JWT ${token}`;}
  return dispatch => {

    dispatch(requestData());

    return fetch(ENDPOINT, Object.assign(config, create_data))
      .then(res => res.json())
      .then((response) => {
        if(response){
          return fetch(response.url, Object.assign(config, send_data))
            .then(res => res.json())
            .then(response => {
              if(response){
                dispatch(messagePopup(false))
                dispatch(statusPopup(true))
              }
            }).catch(err => console.log("Error: ", err))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
