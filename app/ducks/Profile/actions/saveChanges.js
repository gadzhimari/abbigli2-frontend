import * as types from './types';
import { Profile } from 'API';

import { setMe } from '../../Auth/authActions/fetchMe';

const saveRequest = () => ({
  type: types.SAVE_CHANGES_REQUEST,
});

const saveResponse = data => ({
  type: types.SAVE_CHANGES_RESPONSE,
  data,
});

const saveError = data => ({
  type: types.SAVE_CHANGES_ERROR,
  data,
});

const saveChanges = (data) => (dispatch) => {
  dispatch(saveRequest());

  return Profile.saveChanges(data)
    .then((response) => {
      dispatch(saveResponse(response.data));
      dispatch(setMe(response.data));
    })
    .catch(response => dispatch(saveError(response.data)));
};

export default saveChanges;
