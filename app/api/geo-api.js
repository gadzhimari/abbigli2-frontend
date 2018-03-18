import { request } from './instance';
import { DOMAIN_URL } from '../config';

const Geo = {
  getCities(params) {
    return request({
      baseURL: `${DOMAIN_URL}/api/`,
      url: 'geo/cities/',
      params,
    });
  },
  getCountries(params) {
    return request({
      baseURL: `${DOMAIN_URL}/api/`,
      url: 'geo/countries/',
      params,
    });
  },
};

export default Geo;
