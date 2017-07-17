import * as actions from './actionTypes';

const defaultData = {
  type: 1,
  content: '',
  images: [],
  price: '',
  sections: [],
  tags: '',
  title: '',
  city: null,
  date_start: '',
  date_end: '',
  value: null,
  color: 'red',
};

const initialState = {
  isSaving: false,
  isFetchingImage: false,
  isPostFetching: true,
  data: defaultData,
  errors: {},
  imageError: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actions.SAVE_POST_REQ): {
      return Object.assign({}, state, {
        isSaving: true,
      });
    }
    case (actions.SAVE_POST_RES): {
      return Object.assign({}, state, {
        isSaving: false,
        errors: action.errors,
      });
    }
    case (actions.LOAD_IMAGE_REQ): {
      return Object.assign({}, state, {
        isFetchingImage: true,
      });
    }
    case (actions.LOAD_IMAGE_RES): {
      return Object.assign({}, state, {
        isFetchingImage: false,
        imageError: action.imageError,
      });
    }
    case (actions.LOAD_POST_REQ): {
      return Object.assign({}, state, {
        isPostFetching: true,
      });
    }
    case (actions.LOAD_POST_RES): {
      return Object.assign({}, state, {
        isPostFetching: false,
        data: action.data,
      });
    }
    case (actions.CLEAR_DATA): {
      return Object.assign({}, state, {
        isPostFetching: true,
        data: defaultData,
        imageError: [],
        errors: {},
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
