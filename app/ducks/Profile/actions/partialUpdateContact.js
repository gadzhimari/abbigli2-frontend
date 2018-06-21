import { createAction } from 'redux-actions';
import { Profile } from '../../../api';

export const partialUpdateContactRequest = createAction('PARTIAL_UPDATE_CONTACT_REQUEST');
export const partialUpdateContactResponse = createAction('PARTIAL_UPDATE_CONTACT_RESPONSE');
export const partialUpdateContactError = createAction('PARTIAL_UPDATE_CONTACT_ERROR');

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
