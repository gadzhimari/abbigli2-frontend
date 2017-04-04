import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';

const BASE_URL = API_URL;

let storage;

class storagePolyfill {
  setItem(key, data) {
    this.key = data;
  }

  getItem(key) {
    return this.key;
  }
}

try {
  storage = localStorage;
} catch (err) {
  storage = new storagePolyfill;
}

function callApi(endpoint, authenticated) {

  let token = getJsonFromStorage('id_token');
  let config = {}

  if(authenticated) {
    if(token) {
      config = {
        method: 'POST',
        headers: { 'Authorization': `JWT ${token}` }
      }
    } else {
      throw "No token saved!"
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text()
        .then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }

      return text
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated } = callAPI

  const [ requestType, successType, errorType ] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}