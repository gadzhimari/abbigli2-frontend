import { Dialogs } from 'API';
import * as actions from '../actionTypes';

const requestData = () => ({
  type: actions.REQUEST,
});

const setData = data => ({
  type: actions.SET,
  data,
});

const getDialogs = () => async (dispatch) => {
  dispatch(requestData());

  try {
    const response = await Dialogs.getDialogs();
    dispatch(setData(response.data));
  } catch (e) {
    console.log(e);
  }
};

export default getDialogs;
