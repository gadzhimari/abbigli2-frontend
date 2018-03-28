import request from './instance';

const Tags = {
  getTags(params) {
    return request({
      url: 'tags/',
      params,
    });
  },
  getRelatedTags(tags) {
    return request({
      url: 'tags/',
      params: {
        related_with: tags,
      },
    });
  },
};

export default Tags;
