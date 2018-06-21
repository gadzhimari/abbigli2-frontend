import { createAction } from 'redux-actions';

import { Profile } from '../../../api';
import { setMe } from '../../Auth/authActions/fetchMe';

export const saveChangesRequest = createAction('SAVE_CHANGES_REQUEST');
export const saveChangesResponse = createAction('SAVE_CHANGES_RESPONSE');
export const saveChangesError = createAction('SAVE_CHANGES_ERROR');

const saveChanges = data => (dispatch) => {
  dispatch(saveChangesRequest());

  return Profile.saveChanges(data)
    .then((response) => {
      dispatch(saveChangesResponse(response.data));
      dispatch(setMe(response.data));

      return true;
    })
    .catch(({ response }) => {
      dispatch(saveChangesError(response.data));
    });
};

export default saveChanges;
