import { requestV2 } from './instance';

const Tags = {
  getTags(params) {
    return requestV2({
      url: 'tags/',
      params,
    });
  },
  getRelatedTags(tags) {
    return requestV2({
      url: 'tags/',
      params: {
        related_with: tags,
      },
    });
  },
};

export default Tags;
