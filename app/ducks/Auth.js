import { API_URL, DOMAIN_URL } from 'config';
import { setJsonToStorage, getJsonFromStorage, deleteFromStorage } from 'utils/functions';

import * as popupActions from 'ducks/Popup';

// Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const ME_STORE = 'ME_STORE';

// Initial State

const initialState = {
  isFetching: false,
  confirm: false,
  me: {
    avatar: "",
    banner_left: "",
    banner_left_transform: null,
    banner_main: "",
    banner_main_transform: null,
    city: null,
    email_info: "",
    fb_account: "",
    followers: [],
    followers_count: 0,
    following: [],
    google_account: "",
    id: 0,
    info: "",
    is_favorite_visible: true,
    is_feed_visible: true,
    likes_num: 0,
    my_abbigli_name: "",
    ok_account: "",
    phone_info: "",
    pinterest_account: "",
    profile_name: "",
    unread_messages_num: 0,
    vk_account: "",
    website_info: ""
  },
  isAuthenticated: getJsonFromStorage('id_token') ? true : false,
  isFetchingRegister: false,
  isFetchingConfirm: false,
  isFetchingReset: false,
  isFetchingSetpass: false,
  loginErrors: null,
  registerErrors: null,
  resetError: null,
  confirmSignUpError: null,
  confirmResetError: null,
  setpassError: null,
};

// Reducer

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: null,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        loginErrors: action.errorObj,
      });
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetchingRegister: true,
        confirm: false,
        creds: action.creds,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetchingRegister: false,
        confirm: true,
        registerErrors: null,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetchingRegister: false,
        confirm: false,
        registerErrors: action.errorObj,
      });
    case CONFIRM_REQUEST:
      return Object.assign({}, state, {
        isFetchingConfirm: true,
        confirm: false,
        creds: action.creds,
      });
    case CONFIRM_SUCCESS:
      return Object.assign({}, state, {
        isFetchingConfirm: false,
        confirm: true,
      });
    case CONFIRM_FAILURE:
      return Object.assign({}, state, {
        isFetchingConfirm: false,
        confirm: false,
        confirmSignUpError: action.errorObj,
      });
    case RESET_REQUEST:
      return Object.assign({}, state, {
        isFetchingReset: true,
        confirm: false,
        creds: action.creds,
      });
    case RESET_SUCCESS:
      return Object.assign({}, state, {
        isFetchingReset: false,
        confirm: true,
        resetError: null,
      });
    case RESET_FAILURE:
      return Object.assign({}, state, {
        isFetchingReset: false,
        confirm: false,
        resetError: action.errorObj,
      });
    case RESET_CONFIRM_REQUEST:
      return Object.assign({}, state, {
        isFetchingConfirm: true,
        confirm: false,
        creds: action.creds,
      });
    case RESET_CONFIRM_SUCCESS:
      return Object.assign({}, state, {
        isFetchingConfirm: false,
        confirm: true,
        confirmResetError: null,
      });
    case RESET_CONFIRM_FAILURE:
      return Object.assign({}, state, {
        isFetchingConfirm: false,
        confirm: false,
        confirmResetError: action.errorObj,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        me: {},
        isAuthenticated: false,
      });
    case SET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetchingSetpass: true,
      });
    case SET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetchingSetpass: false,
        setpassError: null,
      });
    case SET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetchingSetpass: false,
        setpassError: action.errorObj,
      });
    case ME_STORE:
      return Object.assign({}, state, {
        me: action.me,
        isFetching: false,
        isAuthenticated: true,
      });
    default:
      return state;
  }
}

// ActionCreators
function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.token,
  };
}

function loginError(errorObj) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorObj,
  };
}

export function setMe(me) {
  return {
    type: ME_STORE,
    me,
  };
}

export function fetchMe(tokenId) {
  const token = tokenId || getJsonFromStorage('id_token') || null;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  } else {
    return Promise.reject();
  }

  return dispatch => fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then(userData => dispatch(setMe(userData)));
}

export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`,
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch(`${DOMAIN_URL}api/get-token/`, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          dispatch(loginError(user));

          return;
        }
        
        setJsonToStorage('id_token', user.token);
        document.cookie = `id_token=${user.token}`;

        dispatch(receiveLogin(user));
      });
  };
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestRegister(creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    confirm: false,
    creds,
  };
}

function receiveRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    confirm: true,
  };
}

function registerError(errorObj) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    confirm: false,
    errorObj,
  };
}


// Calls the API to get a token and
// dispatches actions along the way
export function registerUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: creds.phoneNumber }),
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestRegister(creds));

    return fetch(`${API_URL}signup/`, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError(user));

          return;
        }

        setJsonToStorage('phoneNum', user.phone);
        setJsonToStorage('openConfirm', true);

        dispatch(registerPopup(false));
        dispatch(confirmPopup(true));
      });
  };
}


export const CONFIRM_REQUEST = 'CONFIRM_REQUEST';
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS';
export const CONFIRM_FAILURE = 'CONFIRM_FAILURE';

function requestConfirm(creds) {
  return {
    type: CONFIRM_REQUEST,
    isFetching: true,
    confirm: false,
    creds,
  };
}

function receiveConfirm() {
  return {
    type: CONFIRM_SUCCESS,
    isFetching: false,
    confirm: true,
  };
}

function confirmError(errorObj) {
  return {
    type: CONFIRM_FAILURE,
    isFetching: false,
    confirm: false,
    errorObj,
  };
}


// Calls the API to get a token and
// dispatches actions along the way
export function confirmUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: creds.phone, code: creds.code }),
  };

  return (dispatch) => {
    dispatch(requestConfirm());

    return fetch(`${API_URL}signup/confirm/`, config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          dispatch(confirmError(user));

          return;
        }
        // facebook pixel emit event
        fbq('track', 'CompleteRegistration');

        document.cookie = `id_token=${user.token}`;

        deleteFromStorage('openConfirm');
        setJsonToStorage('openSetpass', true);

        dispatch(receiveConfirm(user));
        dispatch(confirmPopup(false));
        dispatch(setpassPopup(true));
      }).catch(err => dispatch(confirmError(err.code[0])));
  };
}


export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

function requestReset(creds) {
  return {
    type: RESET_REQUEST,
    isFetching: true,
    confirm: false,
    creds,
  };
}

function receiveReset() {
  return {
    type: RESET_SUCCESS,
    isFetching: false,
    confirm: true,
  };
}

function resetError(errorObj) {
  return {
    type: RESET_FAILURE,
    isFetching: false,
    confirm: false,
    errorObj,
  };
}


// Calls the API to get a token and
// dispatches actions along the way
export function resetUser(creds) {
  const formData = new FormData();
  formData.append('username', creds.username);

  const config = {
    method: 'POST',
    body: formData,
  };

  return (dispatch) => {
    dispatch(requestReset(creds));

    return fetch(`${API_URL}reset-password/`, config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          dispatch(resetError(user));

          return;
        }

        setJsonToStorage('openResetConfirm', true);
        setJsonToStorage('phoneNum', user.username);

        dispatch(receiveReset());
        dispatch(resetPopup(false));
        dispatch(confirmResetPopup(true));
      }).catch(err => console.log("Error: ", err));
  };
}

export const RESET_CONFIRM_REQUEST = 'RESET_CONFIRM_REQUEST';
export const RESET_CONFIRM_SUCCESS = 'RESET_CONFIRM_SUCCESS';
export const RESET_CONFIRM_FAILURE = 'RESET_CONFIRM_FAILURE';

const resetConfirmReq = () => ({
  type: RESET_CONFIRM_REQUEST,
});

const resetConfirmSuc = () => ({
  type: RESET_CONFIRM_SUCCESS,
});

const resetConfirmFai = errorObj => ({
  type: RESET_CONFIRM_FAILURE,
  errorObj,
});

export const resetConfirm = (creds) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: creds.phone, code: creds.code }),
  };

  return (dispatch) => {
    dispatch(resetConfirmReq());

    fetch(`${API_URL}reset-password/confirm/`, config)
      .then(res => res.json().then(detail => ({ detail, response: res }))
      .then(({ detail, response }) => {
        if (!response.ok) {
          dispatch(resetConfirmFai(detail));
  
          return;
        }

        document.cookie = `id_token=${detail.token}`;
        deleteFromStorage('openResetConfirm');
        setJsonToStorage('openSetpassReset', true);
        setJsonToStorage('currentPass', true);

        dispatch(resetConfirmSuc());
        dispatch(confirmResetPopup(false));
        dispatch(setpassPopup(true));
      }));
  };
};



// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    document.cookie = 'id_token=';
    dispatch(receiveLogout());
  };
}

export const SET_PASSWORD_REQUEST = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_FAILURE = 'SET_PASSWORD_FAILURE';

const setPassRequest = () => ({
  type: SET_PASSWORD_REQUEST,
});

const setPassSuccess = () => ({
  type: SET_PASSWORD_SUCCESS,
});

const setPassFailure = errorObj => ({
  type: SET_PASSWORD_FAILURE,
  errorObj,
});

export const setPassword = (creds) => {
  const token = getJsonFromStorage('id_token');
  
  const config = {
    method: 'POST',
    body: creds,
    headers: {},
  };

  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }

  return (dispatch) => {
    dispatch(setPassRequest);

    fetch(`${API_URL}my-profile/set-password/`, config)
      .then(res => res.json().then(detail => ({ detail, response: res }))
      .then(({ detail, response }) => {
        if (!response.ok) {
          dispatch(setPassFailure(detail));

          return;
        }

        deleteFromStorage('openSetpass');
        deleteFromStorage('openSetpassReset');
        deleteFromStorage('currentPass');
        dispatch(setPassSuccess());
        dispatch(setpassPopup(false));
        dispatch(fetchMe());
      }));
  };
};
