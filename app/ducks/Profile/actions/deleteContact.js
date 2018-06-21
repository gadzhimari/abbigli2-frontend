import { createAction } from 'redux-actions';
import { Profile } from '../../../api';

export const deleteContactRequest = createAction('DELETE_CONTACT_REQUEST');
export const deleteContactResponse = createAction('DELETE_CONTACT_RESPONSE');
export const deleteContactError = createAction('DELETE_CONTACT_ERROR');

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
