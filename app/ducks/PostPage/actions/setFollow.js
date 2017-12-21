import { Profile } from '../../../api';
import { SET_FOLLOWING } from '../actionTypes';

import onlyAuthAction from '../../../lib/redux/onlyAuthAction';

const updateFollow = () => ({
  type: SET_FOLLOWING,
});

const setFollow = id => (dispatch) => {
  dispatch(updateFollow());

  return Profile.follow(id);
};

export default onlyAuthAction(setFollow);
