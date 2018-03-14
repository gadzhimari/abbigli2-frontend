import request from './instance';
import { DOMAIN_URL } from '../config';

const Catalog = {
  getCategoryCrumbs(params) {
    return request({
      baseURL: `${DOMAIN_URL}/node-api/`,
      params,
      url: 'category-tree',
    });
  },
  getCatalog() {
    return request({
      baseURL: `${DOMAIN_URL}/node-api/`,
      url: 'catalog/',
    });
  },
};

export default Catalog;
