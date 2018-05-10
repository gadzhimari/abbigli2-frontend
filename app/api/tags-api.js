import { requestV2 } from './instance';

const Tags = {
  getTags(params) {
    return requestV2({
      url: 'tags/',
      params,
    });
  },
  getRelatedTags(params) {
    return requestV2({
      url: 'tags/',
      params
    });
  },
};

export default Tags;
