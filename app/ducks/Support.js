import { createActions, handleActions } from 'redux-actions';
import { Support } from '../api';
import { openPopup } from './Popup/actions';

const {
  supportRequest,
  supportSuccess,
  supportFailure
} = createActions('SUPPORT_REQUEST', 'SUPPORT_SUCCESS', 'SUPPORT_FAILURE');

const initalState = {
  isFetching: false,
  errors: {},
};

export default handleActions({
  [supportRequest](state) {
    return {
      ...state,
      isFetching: true,
      errors: {}
    };
  },
  [supportSuccess](state) {
    return {
      ...state,
      isFetching: false
    };
  },
  [supportFailure](state, payload) {
    return {
      ...state,
      isFetching: false,
      errors: payload
    };
  }
}, initalState);

export function getSupport(data) {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('email', data.email);
  formData.append('description', data.text);
  formData.append('file', data.file);

  return (dispatch) => {
    dispatch(supportRequest());

    return Support.sendMessage(formData)
      .then(() => {
        dispatch(supportSuccess());
        dispatch(openPopup('statusPopup', {
          title: 'Message have been successfully sent',
        }));
      })
      .catch((err) => {
        dispatch(supportFailure(err.response.data));
      });
  };
}
