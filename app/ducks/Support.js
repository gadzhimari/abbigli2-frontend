import { createAction } from 'redux-actions';
import { Support } from '../api';
import { openPopup } from './Popup/actions';

// Actions
export const SUPPORT_REQUEST = 'SUPPORT_REQUEST';
export const SUPPORT_SUCCESS = 'SUPPORT_SUCCESS';
export const SUPPORT_FAILURE = 'SUPPORT_FAILURE';

const initalState = {
  isFetching: false,
  errors: {},
};

export default function support(state = initalState, action) {
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
        errors: action.payload,
      });
    default:
      return state;
  }
}

const requestSupport = createAction(SUPPORT_REQUEST);
const receiveSupport = createAction(SUPPORT_SUCCESS);
const supportError = createAction(SUPPORT_FAILURE);

export function getSupport(data) {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('email', data.email);
  formData.append('description', data.text);
  formData.append('file', data.file);

  return (dispatch) => {
    dispatch(requestSupport());

    return Support.sendMessage(formData)
      .then(() => {
        dispatch(receiveSupport());
        dispatch(openPopup('statusPopup', {
          title: 'Message have been successfully sent',
        }));
      })
      .catch((err) => {
        dispatch(supportError(err.response.data));
      });
  };
}
