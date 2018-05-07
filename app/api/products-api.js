import { requestV2 } from './instance';
import { pageSize } from '../lib/calculatePagesCount';

export default {
  getProducts(params) {
    return requestV2({
      url: '/products/',
      params: {
        page_size: pageSize,
        ...params
      },
      canApplyToken: true
    });
  },
  getProductsCategories() {
    return requestV2({
      url: '/products/categories/',
      canApplyToken: true
    });
  },
  getProduct(slug, token) {
    return requestV2({
      url: `/products/${slug}/`,
      canApplyToken: true,
      token
    });
  },
  like(slug) {
    return requestV2({
      method: 'POST',
      url: `/products/${slug}/like/`,
      mustApplyToken: true,
    });
  },
  create(data) {
    return requestV2({
      url: '/products/',
      mustApplyToken: true,
      method: 'POST',
      data,
    });
  },
  edit(data, slug) {
    return requestV2({
      url: `/products/${slug}/`,
      mustApplyToken: true,
      method: 'PATCH',
      data,
    });
  },
  delete(slug) {
    return requestV2({
      url: `/products/${slug}/`,
      mustApplyToken: true,
      method: 'DELETE',
    });
  },
  getSimilarProducts(slug) {
    return requestV2({
      url: `/products/${slug}/similar/`,
      canApplyToken: true,
    });
  },
  createComment(slug, data) {
    return requestV2({
      url: `/products/${slug}/reviews/`,
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  getComments(slug) {
    return requestV2({
      url: `/products/${slug}/reviews/`,
      canApplyToken: true
    });
  },
  toggleFavorite(slug) {
    return requestV2({
      url: `/products/${slug}/favorite/`,
      method: 'POST',
      mustApplyToken: true
    });
  }
};
