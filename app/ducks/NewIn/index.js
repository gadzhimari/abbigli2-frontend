import { LOADED_POSTS } from './actions';

const initialState = {
  blogs: [],
  events: [],
  posts: [],
  loadedAll: false,
};

const reducer = (s = initialState, a) => {
  switch (a.type) {
    case (LOADED_POSTS): {
      return {
        ...s,
        ...a.data,
        loadedAll: true,
      };
    }
    default: {
      return s;
    }
  }
};

export default reducer;
