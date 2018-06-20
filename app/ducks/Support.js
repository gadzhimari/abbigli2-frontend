import { createActions, handleActions } from 'redux-actions';
import { Support } from '../api';
import { openPopup } from './Popup/actions';
import { __t } from '../i18n/translator';

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
  [supportFailure](state, { payload }) {
    return {
      ...state,
      isFetching: false,
      errors: payload
    };
  }
}, initalState);

export function getSupport(data) {
  const formData = new FormData();

  Object.keys(data)
    .filter(key => data[key])
    .forEach(key => formData.append(key, data[key]));

  return (dispatch) => {
    dispatch(supportRequest());

    return Support.sendMessage(formData)
      .then(() => {
        dispatch(supportSuccess());
        dispatch(openPopup('statusPopup', {
          title: __t('message.success'),
        }));
      })
      .catch((err) => {
        dispatch(supportFailure(err.response.data));
      });
  };
}
