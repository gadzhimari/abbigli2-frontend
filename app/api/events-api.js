import { requestV2 } from './instance';
import { pageSize } from '../lib/calculatePagesCount';

export default {
  getEvents(params) {
    return requestV2({
      url: 'events/',
      params: {
        page_size: pageSize,
        ...params
      },
      canApplyToken: true
    });
  },
  getEventsCategories() {
    return requestV2({
      url: 'events/categories/',
      canApplyToken: true
    });
  },
  getEvent(slug, token) {
    return requestV2({
      url: `events/${slug}/`,
      canApplyToken: true,
      token
    });
  },
  like(slug) {
    return requestV2({
      method: 'POST',
      url: `events/${slug}/like/`,
      mustApplyToken: true,
    });
  },
  create(data) {
    return requestV2({
      url: '/events/',
      mustApplyToken: true,
      method: 'POST',
      data,
    });
  },
  edit(data, slug) {
    return requestV2({
      url: `/events/${slug}/`,
      mustApplyToken: true,
      method: 'PATCH',
      data,
    });
  },
  delete(slug) {
    return requestV2({
      url: `/events/${slug}/`,
      mustApplyToken: true,
      method: 'DELETE',
    });
  },
  getSimilarEvents(slug) {
    return requestV2({
      url: `/events/${slug}/similar/`,
      canApplyToken: true,
    });
  },
  createComment(slug, data) {
    return requestV2({
      url: `/events/${slug}/comments/`,
      method: 'POST',
      data,
      mustApplyToken: true,
    });
  },
  getComments(slug) {
    return requestV2({
      url: `/events/${slug}/comments/`,
      canApplyToken: true,
    });
  }
};
