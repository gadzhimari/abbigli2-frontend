// Actions
const LOGIN = 'abbigli/ui/LOGIN';
const REGISTER = 'abbigli/ui/REGISTER';
const CONFIRM = 'abbigli/ui/CONFIRM';
const DELETE_MESSAGE = 'abbigli/ui/DELETE_MESSAGE';
const SEND_MSG_YOURSF_ERR = 'abbigli/ui/SEND_MSG_YOURSF_ERR';
const RESET = 'abbigli/ui/RESET';
const STATUS = 'abbigli/ui/STATUS';
const MESSAGE = 'abbigli/ui/MESSAGE';
const WANTS = 'abbigli/ui/WANTS';
const SUPPORT = 'abbigli/ui/SUPPORT';
const SEARCH = 'abbigli/ui/SEARCH';
const SET_PASSWORD = 'abbigli/ui/SET_PASSWORD';
const CONFIRM_RESET = 'abbigli/ui/CONFIRM_RESET';
const CLOSEALL = 'abbigli/ui/CLOSEALL';
const OPEN_POPUP = 'abbigli/ui/OPEN_POPUP';
const CLOSE_POPUP = 'abbigli/ui/CLOSE_POPUP';

// Reducer
export default function (state = {
  openedPopup: null,
  options: {},
  showLogin: false,
  showRegister: false,
  showConfirm: false,
  showDeleteMessage: false,
  showReset: false,
  showMessage: false,
  showStatus: false,
  showWants: false,
  showSupport: false,
  showSearch: false,
  showSetpass: false,
  confirmResetShow: false,
}, action = {}) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        showLogin: action.show
      });
    case OPEN_POPUP:
      return Object.assign({}, state, {
        openedPopup: action.name,
        options: action.options,
      });
    case CLOSE_POPUP:
      return Object.assign({}, state, {
        openedPopup: null,
        options: {},
      });
    case REGISTER:
      return Object.assign({}, state, {
        showRegister: action.show
      });
    case CONFIRM:
      return Object.assign({}, state, {
        showConfirm: action.show
      });
    case DELETE_MESSAGE:
      return Object.assign({}, state, {
        showDeleteMessage: action.show,
        dialogId: action.id,
        recipient: action.recipient
      });
    case SEND_MSG_YOURSF_ERR:
      return Object.assign({}, state, {
        sendMessageYourselfError: action.show
      });
    case RESET:
      return Object.assign({}, state, {
        showReset: action.show
      });
    case MESSAGE:
      return Object.assign({}, state, {
        showMessage: action.show,
        userId: action.id,
        userName: action.recipient,
      });
    case STATUS:
      return Object.assign({}, state, {
        showStatus: action.show
      });
    case WANTS:
      return Object.assign({}, state, {
        showWants: action.show
      });
    case SUPPORT:
      return Object.assign({}, state, {
        showSupport: action.show
      });
    case SEARCH:
      return Object.assign({}, state, {
        showSearch: action.show,
      });
    case SET_PASSWORD:
      return Object.assign({}, state, {
        showSetpass: action.show,
      });
    case CONFIRM_RESET:
      return Object.assign({}, state, {
        confirmResetShow: action.show,
      });
    case CLOSEALL:
      return Object.assign({}, state, {
        showLogin: false,
        showRegister: false,
        showConfirm: false,
        showDeleteMessage: false,
        showReset: false,
        showMessage: false,
        showStatus: false,
        showSupport: false,
        showSearch: false,
      });
    default:
      return state;
  }
}

// Action Creators
export const openPopup = (name, options = {}) => ({
  type: OPEN_POPUP,
  name,
  options,
});

export const closePopup = () => ({
  type: CLOSE_POPUP,
});

export function loginPopup(show = true) {
  return {
    type: LOGIN,
    show,
  };
}

export function registerPopup(show = true) {
  return {
    type: REGISTER,
    show,
  };
}

export function confirmPopup(show = true) {
  return {
    type: CONFIRM,
    show,
  };
}

export function confirmResetPopup(show = true) {
  return {
    type: CONFIRM_RESET,
    show,
  };
}

export function deleteMessagePopup(show = true, id, recipient) {
  return {
    type: DELETE_MESSAGE,
    show,
    id,
    recipient,
  };
}

export function sendMessageYourselfPopup(show = true) {
  return {
    type: SEND_MSG_YOURSF_ERR,
    show,
  };
}

export function resetPopup(show = true) {
  return {
    type: RESET,
    show,
  };
}

export function statusPopup(show = true) {
  return {
    type: STATUS,
    show,
  };
}

export function messagePopup(show = true, id, recipient) {
  console.log(id, recipient, 'action');
  return {
    type: MESSAGE,
    show,
    id,
    recipient,
  };
}

export function wantsPopup(show = true) {
  return {
    type: WANTS,
    show,
  };
}

export function supportPopup(show = true) {
  return {
    type: SUPPORT,
    show,
  };
}

export function searchPopup(show = true) {
  return {
    type: SEARCH,
    show,
  };
}

export function setpassPopup(show = true) {
  return {
    type: SET_PASSWORD,
    show,
  };
}

export function closeAll() {
  return {
    type: CLOSEALL,
  };
}
