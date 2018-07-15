import { requestV2 } from './instance';
import { pageSize } from '../lib/calculatePagesCount';

export default {
  loadBucket(author, params = {}) {
    return requestV2({
      url: '/products/',
      params: {
        page_size: pageSize,
        author,
        status: 'archived',
        ...params
      },
      canApplyToken: true
    });
  },
  addToBucket(slug) {
    return requestV2({
      url: `/products/${slug}/`,
      mustApplyToken: true,
      method: 'PATCH',
      data: { status: 'archived' }
    });
  },
  removeFromBucket(slug) {
    return requestV2({
      url: `/products/${slug}/`,
      mustApplyToken: true,
      method: 'PATCH',
      data: { status: 'published' }
    });
  }
};
