import { openPopup } from 'ducks/Popup/actions';
import * as actions from './';

const getCallbackByType = type => actions[`${type}Confirm`];

const stagedPopup = type => (dispatch, getState) => {
  const stage = getState().Auth[`${type}Stage`];
  const options = {};

  if (stage === 'confirm') {
    options.callback = getCallbackByType(type);
    options.previousPopup = type === 'register'
      ? 'registerPopup'
      : 'resetPopup';
  }

  dispatch(openPopup(`${stage}Popup`, options));
};

export default stagedPopup;
