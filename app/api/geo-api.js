import request from './instance';

const Geo = {
  getCitiesByName(name) {
    return request({
      url: `geo/cities/?name=${name}`
    });
  },
};

export default Geo;
