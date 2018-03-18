import { request } from './instance';
import { DOMAIN_URL } from '../config';

const Catalog = {
  getCategoryCrumbs(params) {
    return request({
      baseURL: `http://beta.abbigli.ru/node-api/`,
      params,
      url: 'category-tree',
    });
  },
  getCatalog() {
    return request({
      baseURL: `http://beta.abbigli.ru/node-api/`,
      url: 'catalog/',
    });
  },
};

export default Catalog;
