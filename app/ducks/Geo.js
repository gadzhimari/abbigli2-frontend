import { createAction } from 'redux-actions';
import { Geo } from '../api';

const SET = 'abbigli/Geo/SET';
const SAVE_CITY = 'SAVE_CITY';

export const setData = createAction(SET);
export const saveCity = createAction(SAVE_CITY);

const initialState = {
  city: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET:
      return Object.assign({}, state, {
        cities: action.payload,
      });
    case SAVE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });
    default:
      return state;
  }
};

export function getCities() {
  return dispatch => Geo.getCities()
    .then((res) => {
      dispatch(setData(res.data));
    });
}
