import { openPopup } from '../../Popup/actions';
import * as actions from './';

const getCallbackByType = type => actions[`${type}Confirm`];

const stagedPopup = type => (dispatch, getState) => {
  const stage = getState().Auth[`${type}Stage`];
  const options = {};
  let suffix = 'Popup';

  if (stage === 'confirm') {
    options.callback = getCallbackByType(type);
    options.previousPopup = type === 'register'
      ? 'registerPopup'
      : 'resetPopup';

    suffix = type === 'register' ? 'Registration' : 'ResetPassword';
  }

  dispatch(openPopup(`${stage}${suffix}`, options));
};

export default stagedPopup;
