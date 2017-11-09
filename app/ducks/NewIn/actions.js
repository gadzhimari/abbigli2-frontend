import { Posts } from 'API';

export const LOADED_POSTS = 'newIn/LOADED_POSTS';

const loadedPosts = data => ({
  type: LOADED_POSTS,
  data,
});

const sourcesTypes = [1, 3, 4];

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

    sourcesTypes.forEach((type, idx) => {
      Posts.getPosts({
        type,
        popular: true,
      })
      .then(res => callback(res.data.results, idx));
    });
  };
};

export default loadPosts;
