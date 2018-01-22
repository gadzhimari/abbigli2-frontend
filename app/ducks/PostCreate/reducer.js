import * as actions from './actionTypes';

const initialState = {
  isSaving: false,
  isFetchingImage: false,
  isPostFetching: true,
  data: null,
  errors: {},
  imageError: [],
  isExistingPost: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actions.SAVE_POST_REQ): {
      return {
        ...state,
        isSaving: true,
      };
    }
    case (actions.SAVE_POST_RES): {
      return {
        ...state,
        isSaving: false,
        errors: action.errors,
      };
    }
    case (actions.LOAD_IMAGE_REQ): {
      return {
        ...state,
        isFetchingImage: true,
<<<<<<< HEAD
        errors: {
          ...state.errors,
          images: [],
        },
      });
=======
      };
>>>>>>> Промежуточный коммит
    }
    case (actions.LOAD_IMAGE_RES): {
      return {
        ...state,
        isFetchingImage: false,
        imageError: action.imageError,
      };
    }
    case (actions.LOAD_POST_REQ): {
      return {
        ...state,
        isPostFetching: true,
      };
    }
    case (actions.LOAD_POST_RES): {
      return {
        ...state,
        isPostFetching: false,
        data: action.data,
        isExistingPost: true,
      };
    }
    case (actions.CLEAR_DATA): {
      return {
        ...state,
        isPostFetching: true,
        data: {},
        imageError: [],
        errors: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
