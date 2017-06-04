import { API_URL } from 'config';
import { openPopup } from 'ducks/Popup/actions';

// Actions
export const SUPPORT_REQUEST = 'SUPPORT_REQUEST';
export const SUPPORT_SUCCESS = 'SUPPORT_SUCCESS';
export const SUPPORT_FAILURE = 'SUPPORT_FAILURE';

export default function support(state = {
  isFetching: false,
  errors: {},
}, action) {
  switch (action.type) {
    case SUPPORT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errors: {},
      });
    case SUPPORT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errors: {},
      });
    case SUPPORT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.message,
      });
    default:
      return state;
  }
}

function requestSupport() {
  return {
    type: SUPPORT_REQUEST,
  };
}

function receiveSupport() {
  return {
    type: SUPPORT_SUCCESS,
  };
}

function supportError(message) {
  return {
    type: SUPPORT_FAILURE,
    message,
  };
}

export function getSupport(data) {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('email', data.email);
  formData.append('description', data.text);
  formData.append('file', new Blob(data.file));

  const config = {
    method: 'POST',
    body: formData,
  };

  return (dispatch) => {
    dispatch(requestSupport(data));

    return fetch(`${API_URL}support/`, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          throw new Error(JSON.stringify(user));
        }

        dispatch(openPopup('statusPopup', {
          title: 'Message have been successfully sent',
        }));

        receiveSupport();
      })
      .catch(err => dispatch(supportError(JSON.parse(err.message))));
  };
}
