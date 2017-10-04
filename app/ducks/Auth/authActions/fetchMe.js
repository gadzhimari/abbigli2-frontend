import { ME_STORE } from '../actionsTypes';
import { Auth } from 'API';

export const setMe = data => ({
  type: ME_STORE,
  data,
});

const fetchMe = token => dispatch => Auth.getMyProfile(token)
  .then(res => dispatch(setMe(res.data)));

export default fetchMe;
