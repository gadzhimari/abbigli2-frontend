import req from './instance';

const Geo = {
  getCities(params) {
    return req({
      url: 'geo/cities/',
      params,
    });
  },
  getCountries(params) {
    return req({
      url: 'geo/countries/',
      params,
    });
  },
};

export default Geo;
