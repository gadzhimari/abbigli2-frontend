import request from './instance';
import { DOMAIN_URL } from '../config';

const Catalog = {
  getCategoryCrumbs(data) {
    return request({
      baseURL: `${DOMAIN_URL}node-api/`,
      data,
      url: 'category-tree',
    });
  },
};

export default Catalog;
