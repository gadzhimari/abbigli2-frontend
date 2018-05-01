import { POST_PATH_BY_TYPE } from '../constants/posts-types';

export default function createRealativePostsLink({ slug }, type) {
  return `/${POST_PATH_BY_TYPE[type]}/${slug}/relative`;
}
