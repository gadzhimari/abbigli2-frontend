import { Posts } from 'API';

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

export const fetchData = slug => (dispatch) => {
  dispatch(request());
  const promises = [
    Posts.getSimilarPosts(slug),
    Posts.getPost(slug),
  ];

  return Promise.all(promises)
    .then(([items, post]) => {
      dispatch(response(items.data, post.data));
    });
};
