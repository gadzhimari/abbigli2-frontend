import {API_URL} from 'config'

// Actions
export const SUPPORT_REQUEST = 'SUPPORT_REQUEST'
export const SUPPORT_SUCCESS = 'SUPPORT_SUCCESS'
export const SUPPORT_FAILURE = 'SUPPORT_FAILURE'

export default function support(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case SUPPORT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case SUPPORT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      })
    case SUPPORT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

function requestSupport() {
  return {
    type: SUPPORT_REQUEST,
    isFetching: true
  }
}

function receiveSupport() {
  return {
    type: SUPPORT_SUCCESS,
    isFetching: false
  }
}

function supportError(message) {
  return {
    type: SUPPORT_FAILURE,
    isFetching: false,
    message
  }
}

export function getSupport(data) {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('email', data.email)
  formData.append('description', data.text)
  formData.append('file', new Blob(data.file))

  let config = {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data; boundary=RaNdOmDeLiMiTeR'},
    body: formData
    //body: `title=${data.title}&email=${data.email}&description=${data.text}&file=${encodeURIComponent(data.file)}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSupport(data))

    return fetch(API_URL+'support/', config)
      .then(response =>
        response.json().then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          //dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          //storage.setItem('id_token', user.token)
          // Dispatch the success action
          //dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
