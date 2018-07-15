import { createAction } from 'redux-actions';
import { Profile } from '../../../api';

export const addContactRequest = createAction('ADD_CONTACT_REQUEST');
export const addContactResponse = createAction('ADD_CONTACT_RESPONSE');
export const addContactError = createAction('ADD_CONTACT_ERROR');

const addContact = data => (dispatch) => {
  dispatch(addContactRequest());

  return Profile.addContact(data)
    .then((response) => {
      dispatch(addContactResponse(response.data));

      return true;
    })
    .catch(({ response }) => {
      dispatch(addContactError(response.data));
    });
};

export default addContact;
