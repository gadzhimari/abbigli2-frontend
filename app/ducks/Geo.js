import { createActions, handleActions } from 'redux-actions';
import { Geo } from '../api';

export const {
  setData,
  saveCity
} = createActions('SET_DATA', 'SAVE_CITY');

const initialState = { city: null };

export default handleActions({
  [setData](state, payload) {
    return {
      ...state,
      cities: payload
    };
  },
  [saveCity](state, payload) {
    return {
      ...state,
      city: payload
    };
  }
}, initialState);

export function getCities() {
  return dispatch => Geo.getCities()
    .then((res) => {
      dispatch(setData(res.data));
    });
}

export function getCity({ latitude, longitude }) {
  return dispatch => Geo.getCities({ latitude, longitude })
    .then(({ data }) => {
      dispatch(saveCity(data.results[0]));
    });
}
