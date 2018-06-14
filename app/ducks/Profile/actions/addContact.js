import * as types from './types';
import { Profile } from '../../../api';

const addContactRequest = () => ({
  type: types.ADD_CONTACT_REQUEST,
});

const addContactResponse = data => ({
  type: types.ADD_CONTACT_RESPONSE,
  data,
});

const addContactError = data => ({
  type: types.ADD_CONTACT_ERROR,
  data,
});

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
