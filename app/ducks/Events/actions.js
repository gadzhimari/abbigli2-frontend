import { createAction } from 'redux-actions';
import { Events } from '../../api';

export const fetchEventsRequest =
  createAction('EVENTS_FETCH_REQUEST');
export const fetchEventsSuccess =
  createAction('EVENTS_FETCH_SUCCESS');
export const fetchEventsFailure = createAction('EVENTS_FETCH_FAILED');

export const fetchEvents = options => async (dispatch) => {
  dispatch(fetchEventsRequest());
  try {
    const response = await Events.getEvents(options);
    dispatch(fetchEventsSuccess(response.data));
  } catch (e) {
    dispatch(fetchEventsFailure());
  }
};
