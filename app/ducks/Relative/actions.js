import { Posts, Products, Events } from '../../api';

const actionsByType = {
  post: [Posts.getSimilarPosts, Posts.getPost],
  product: [Products.getSimilarPosts, Products.getProduct],
  event: [Events.getSimilarPosts, Events.getEvent]
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

export const fetchData = (postType, slug) => (dispatch) => {
  dispatch(request());
  const promises = actionsByType[postType].map(action => action(slug));

  return Promise.all(promises)
    .then(([items, post]) => {
      dispatch(response(items.data, post.data));
    });
};
