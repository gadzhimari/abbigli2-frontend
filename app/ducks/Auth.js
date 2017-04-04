import { API_URL } from 'config';
import { setJsonToStorage, getJsonFromStorage } from 'utils/functions';

// Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const ME_STORE = 'ME_STORE';

// Initial State

const initialState = {
  isFetching: true,
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
  isAuthenticated: getJsonFromStorage('id_token') ? true : false
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
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      })
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        confirm: false,
        creds: action.creds
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        confirm: true
      })
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        confirm: false,
        errorMessage: action.message
      })
    case CONFIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        confirm: false,
        creds: action.creds
      })
    case CONFIRM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        confirm: true
      })
    case CONFIRM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        confirm: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        me: {},
        isAuthenticated: false
      });
    case ME_STORE:
      return Object.assign({}, state, {
        me: action.me,
        isFetching: false,
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
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function setMe(me) {
  return {
    type: ME_STORE,
    me,
  };
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://beta.abbigli.ru/api/get-token/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          setJsonToStorage('id_token', user.token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
          dispatch(fetchMe())
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function fetchMe() {
  let token = getJsonFromStorage('id_token') || null;
  let config = {
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if(token){config.headers.Authorization = `JWT ${token}`;}

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    //dispatch(requestLogin(creds))

    fetch(API_URL + 'my-profile/', config)
      .then(res => res.json())
      .then((responseData) => {
        if (responseData) {
          dispatch(setMe(responseData));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}



// Calls the API to get a token and
// dispatches actions along the way
export function loginUserSocial(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: creds.code })
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    let endpoint;
    if (creds.provider === 'fb') {
      endpoint = 'http://beta.abbigli.ru/api/mobile/social/facebook/';
    }

    if (creds.provider === 'vk') {
      endpoint = 'http://beta.abbigli.ru/api/mobile/social/vk/';
    }

    return fetch(endpoint, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          setJsonToStorage('id_token', user.token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}



export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function requestRegister(creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    confirm: false,
    creds
  }
}

function receiveRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    confirm: true
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    confirm: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function registerUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: creds.phoneNumber })
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestRegister(creds))

    return fetch(API_URL + 'signup/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError(response.statusText))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          setJsonToStorage('id_token', user.token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


export const CONFIRM_REQUEST = 'CONFIRM_REQUEST'
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS'
export const CONFIRM_FAILURE = 'CONFIRM_FAILURE'

function requestConfirm(creds) {
  return {
    type: CONFIRM_REQUEST,
    isFetching: true,
    confirm: false,
    creds
  }
}

function receiveConfirm(user) {
  return {
    type: CONFIRM_SUCCESS,
    isFetching: false,
    confirm: true
  }
}

function confirmError(message) {
  return {
    type: CONFIRM_FAILURE,
    isFetching: false,
    confirm: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function confirmUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: creds.phone, code: creds.code })
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestConfirm(creds))

    return fetch(API_URL + 'signup/confirm/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(confirmError(response.statusText[0]))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          setJsonToStorage('id_token', user.token)
          // Dispatch the success action
          dispatch(receiveConfirm(user))
        }
      }).catch(err => dispatch(confirmError(err.code[0])))
  }
}


export const RESET_REQUEST = 'RESET_REQUEST'
export const RESET_SUCCESS = 'RESET_SUCCESS'
export const RESET_FAILURE = 'RESET_FAILURE'

function requestReset(creds) {
  return {
    type: RESET_REQUEST,
    isFetching: true,
    confirm: false,
    creds
  }
}

function receiveReset(user) {
  return {
    type: RESET_SUCCESS,
    isFetching: false,
    confirm: true
  }
}

function resetError(message) {
  return {
    type: RESET_FAILURE,
    isFetching: false,
    confirm: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function resetUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: `username=${creds.username}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestReset(creds))

    return fetch('http://beta.abbigli.ru/api/v1/reset-password/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(resetError(user.message))
          return Promise.reject(user)
        } else {
          // Dispatch the success action
          dispatch(receiveReset(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}



// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  };
}
