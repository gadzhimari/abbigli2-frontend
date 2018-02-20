import * as actions from '../actionTypes';

const setActiveDialog = id => ({
  type: actions.SET_ACTIVE,
  id,
});

export default setActiveDialog;
