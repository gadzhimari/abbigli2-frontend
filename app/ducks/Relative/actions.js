import { Posts, Products, Events } from '../../api';
import { PRODUCT_PATH, BLOG_PATH, EVENT_PATH, POST_TYPE_BY_PATH } from '../../lib/constants/posts-types';
import { setNetworkError } from '../NetworkErrors/reducer';

const actionsByPath = {
  [BLOG_PATH]: [Posts.getSimilarPosts, Posts.getPost],
  [PRODUCT_PATH]: [Products.getSimilarProducts, Products.getProduct],
  [EVENT_PATH]: [Events.getSimilarEvents, Events.getEvent]
};

export const RELATIVE_REQUEST = 'RELATIVE_REQUEST';
export const RELATIVE_RESPONSE = 'RELATIVE_RESPONSE';

const request = () => ({
  type: RELATIVE_REQUEST,
});

const response = (data, post) => ({
  type: RELATIVE_RESPONSE,
  data,
  post,
});

export const fetchData = (slug, path) => (dispatch) => {
  dispatch(request());
  const promises = actionsByPath[path].map(action => action(slug));
  const type = POST_TYPE_BY_PATH[path];

  return Promise.all(promises)
    .then(([{ data }, post]) => {
      dispatch(response({
        ...data,
        results: data.results.map(item => ({ ...item, type }))
      }, { ...post.data, type }));
    })
    .catch(({ response }) => {
      dispatch(setNetworkError(response));
    });
};
