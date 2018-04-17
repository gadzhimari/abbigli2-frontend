import { requestV2 } from './instance';

export default {
  getProducts(params) {
    return requestV2({
      url: '/products/',
      params,
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
      url: `/products/${slug}/comments/`,
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  getComments(slug) {
    return requestV2({
      url: `/products/${slug}/comments/`,
      canApplyToken: true,
    });
  }
};
