import * as types from './types';
import { Profile } from '../../../api';

const deleteContactRequest = () => ({
  type: types.DELETE_CONTACT_REQUEST,
});

const deleteContactResponse = id => ({
  type: types.DELETE_CONTACT_RESPONSE,
  payload: id,
});

const deleteContactError = data => ({
  type: types.DELETE_CONTACT_ERROR,
  data,
});

const deleteContact = id => (dispatch) => {
  dispatch(deleteContactRequest());

  return Profile.deleteContact(id)
    .then(() => {
      dispatch(deleteContactResponse(id));

      return true;
    })
    .catch(({ response }) => {
      dispatch(deleteContactError(response.data));
    });
};

export default deleteContact;
