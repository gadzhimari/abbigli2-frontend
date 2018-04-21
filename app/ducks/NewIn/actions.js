import { Posts, Products, Events } from '../../api';

export const LOADED_POSTS = 'newIn/LOADED_POSTS';

const loadedPosts = data => ({
  type: LOADED_POSTS,
  data,
});

const actions = [Products.getProducts, Events.getEvents, Posts.getPosts];

const loadPosts = () => {
  const results = [];
  let loaded = 0;

  return (dispatch) => {
    const callback = (data, idx) => {
      loaded += 1;
      results[idx] = data;

      if (loaded === 3) {
        dispatch(loadedPosts({
          posts: results[0],
          events: results[1],
          blogs: results[2],
        }));
      }
    };

    actions.forEach((action, idx) => {
      action()
        .then(res => callback(res.data.results, idx))
        .catch(() => callback([], idx));
    });
  };
};

export default loadPosts;
