// Actions

const SET_TAGS = 'abbigli/Search/SET_TAGS';
const ADD_TAG = 'abbigli/Search/ADD_TAGS';
const DELETE_TAG = 'abbigli/Search/DELETE_TAG';
const DELETE_ALL_TAGS = 'abbigli/Search/DELETE_ALL_TAGS';
const CHANGE_TAGS_VALUE = 'abbigli/Search/CHANGE_TAGS_VALUE';
const CLEAR_TAGS_VALUE = 'abbigli/Search/CLEAR_TAGS_VALUE';

// Initital state

const initialState = {
  tagList: [],
  tagsValue: '',
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TAGS:
      return Object.assign({}, state, {
        tagList: action.tags,
      });

    case ADD_TAG:
      return Object.assign({}, state, {
        tagList: state.tagList
          .concat(action.tag),
      });

    case DELETE_TAG:
      return Object.assign({}, state, {
        tagList: state.tagList
          .filter(tag => tag.id !== action.id),
      });
    
    case DELETE_ALL_TAGS:
      return Object.assign({}, state, {
        tagList: [],
      });

    case CHANGE_TAGS_VALUE:
      return Object.assign({}, state, {
        tagsValue: action.value,
      });
    
    case CLEAR_TAGS_VALUE:
      return Object.assign({}, state, {
        tagsValue: '',
      });

    default:
      return state;
  }
};

// Action Creators

export function setTags(tags) {
  return ({
    type: SET_TAGS,
    tags,
  });
}

export function addTag(tag) {
  return ({
    type: ADD_TAG,
    tag,
  });
}

export function deleteTag(id) {
  return ({
    type: DELETE_TAG,
    id,
  });
}

export function deleteAllTags() {
  return ({
    type: DELETE_ALL_TAGS,
  });
}

export function changeValue(value) {
  return ({
    type: CHANGE_TAGS_VALUE,
    value,
  });
}

export function clearValue() {
  return ({
    type: CLEAR_TAGS_VALUE,
  });
}
