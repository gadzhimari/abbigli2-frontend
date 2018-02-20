import { Dialogs } from 'API';
import { closePopup } from 'ducks/Popup/actions';
import * as actions from '../actionTypes';

const deleteData = id => ({
  type: actions.DELETE,
  id,
});

const deleteDialog = id => (dispatch) => {
  dispatch(deleteData(id));
  dispatch(closePopup());

  Dialogs.deleteDialog(id);
};

export default deleteDialog;
