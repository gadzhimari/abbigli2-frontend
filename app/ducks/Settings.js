import { createAction } from 'redux-actions';
import { Geo } from '../api';
import { location } from '../config';

import { getCookie } from '../lib/cookie';

const SET_GEO = 'abbigli/settings/SET_GEO';

const isEN = location === 'en';

const setGeo = createAction(SET_GEO);

const initialState = {
  data: {
    CURRENCY: isEN ? '$ ?' : '? руб',
    usd_code: isEN ? 'USD' : 'RUB',
  },
  geo: [],
  currentCountry: null,
};

export default function (state = initialState, action = {}) {
  if (action.type === SET_GEO) {
    const code = getCookie('countryCode');
    const data = action.payload;
    const currentCountry = data
      .filter(item => item.code === code)[0];

    return {
      ...state,
      geo: data,
      currentCountry,
    };
  }

  return state;
}

export function fetchGeo() {
  return dispatch => Geo.getCountries({ page_size: 255 })
    .then((res) => {
      dispatch(setGeo(res.data.results));
    });
}
