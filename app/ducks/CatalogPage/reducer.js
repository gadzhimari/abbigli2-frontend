import * as actions from './actions';

const initialState = {
  isFetchingPosts: true,
  isFetchingTags: true,
  isFetchingMoreTags: false,
  posts: [],
  tags: [],
  postPagesCount: 0,
  nextTagsPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_POSTS: {
      return {
        ...state,
        isFetchingPosts: true,
      };
    }
    case actions.RESPONSE_POSTS: {
      return {
        ...state,
        isFetchingPosts: false,
        posts: action.results,
        postPagesCount: Math.ceil(action.count / 30),
      };
    }
    case actions.REQUEST_TAGS: {
      return {
        ...state,
        isFetchingTags: true,
      };
    }
    case actions.RESPONSE_TAGS: {
      return {
        ...state,
        isFetchingTags: false,
        tags: action.results,
        nextTagsPage: action.next && (state.nextTagsPage + 1),
      };
    }
    case actions.REQUEST_MORE_TAGS: {
      return {
        ...state,
        isFetchingMoreTags: true,
      };
    }
    case actions.RESPONSE_MORE_TAGS: {
      return {
        ...state,
        isFetchingMoreTags: false,
        tags: [...state.tags, ...action.results],
        nextTagsPage: action.next && (state.nextTagsPage + 1),
      };
    }
    default:
      return state;
  }
};

export default reducer;
