import { createAction } from 'redux-actions';
import { Profile } from '../../../api';

import onlyAuthAction from '../../../lib/redux/onlyAuthAction';

export const updateFollow = createAction('UPDATE_FOLLOW');

const setFollow = id => (dispatch) => {
  dispatch(updateFollow());

  return Profile.follow(id);
};

export default onlyAuthAction(setFollow);
