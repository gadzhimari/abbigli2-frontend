import * as actions from './actionTypes';

const initialState = {
  isFetchingPost: true,
  isFetchingPopular: true,
  isFetchingNew: true,
  post: {},
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
    case (actions.ERROR_404): {
      return Object.assign({}, state, {
        isFetchingPost: false,
        isDefined: false,
      });
    }
    case (actions.CHANGE_FOLLOW): {
      return Object.assign({}, state, {
        post: Object.assign({}, state.post, {
          user: Object.assign({}, state.post.user, {
            is_subscribed: !state.post.user.is_subscribed,
          }),
        }),
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
