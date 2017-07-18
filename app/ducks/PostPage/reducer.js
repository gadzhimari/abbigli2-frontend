import * as actions from './actionTypes';

const initialState = {
  isFetchingPost: true,
  isFetchingPopular: true,
  isFetchingNew: true,
  post: {},
  author: {},
  popularPosts: [],
  newPosts: [],
  isDefined: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actions.REQUEST_POST): {
      return Object.assign({}, state, {
        isFetchingPost: true,
      });
    }
    case (actions.RESPONSE_POST): {
      return Object.assign({}, state, {
        isFetchingPost: false,
        post: action.post,
        author: action.post.user,
      });
    }
    case (actions.REQUEST_POPULAR): {
      return Object.assign({}, state, {
        isFetchingPopular: true,
      });
    }
    case (actions.RESPONSE_POPULAR): {
      return Object.assign({}, state, {
        isFetchingPopular: false,
        popularPosts: action.popularPosts,
      });
    }
    case (actions.REQUEST_NEW): {
      return Object.assign({}, state, {
        isFetchingNew: true,
      });
    }
    case (actions.RESPONSE_NEW): {
      return Object.assign({}, state, {
        isFetchingNew: false,
        newPosts: action.newPosts,
      });
    }
    case (actions.SET_FOLLOWING): {
      return Object.assign({}, state, {
        author: Object.assign({}, state.author, {
          is_subscribed: !state.author.is_subscribed,
        }),
      });
    }
    case (actions.ERROR_404): {
      return Object.assign({}, state, {
        isFetchingPost: false,
        isDefined: false,
      });
    }
    case (actions.RESET_POST): {
      return Object.assign({}, state, initialState);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
