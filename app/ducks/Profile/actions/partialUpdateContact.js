import * as types from './types';
import { Profile } from '../../../api';

const partialUpdateContactRequest = () => ({
  type: types.PARTIAL_UPDATE_CONTACT_REQUEST,
});

const partialUpdateContactResponse = data => ({
  type: types.PARTIAL_UPDATE_CONTACT_RESPONSE,
  data,
});

const partialUpdateContactError = data => ({
  type: types.PARTIAL_UPDATE_CONTACT_ERROR,
  data,
});

const partialUpdateContact = data => (dispatch) => {
  dispatch(partialUpdateContactRequest());
  const { id, ...options } = data;

  return Profile.partialUpdateContact(id, options)
    .then((response) => {
      const data = { id, ...response.data };
      dispatch(partialUpdateContactResponse(data));

      return true;
    })
    .catch(({ response }) => {
      dispatch(partialUpdateContactError(response.data));
    });
};

export default partialUpdateContact;
