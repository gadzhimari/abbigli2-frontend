import * as types from './actions/types';

const initialState = {
  /** Статус загрузки данных о профиле */
  isFetching: true,
  /** Данные текущего профиля */
  data: {},
  /** Подписчики пользователя */
  followers: [],
  /** Подписки пользователя */
  following: null,
  /** Содержит name текущего загружаемого изображения */
  uploadingImage: null,
  /** Указывает текущего ли юзера загружен профиль */
  isMe: false,
  /** Статус сохранения данных профиля */
  isSaving: false,
};

const profileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case (types.PROFILE_LOAD_REQUEST): {
      return {
        ...state,
        isFetching: true,
        data: {},
      };
    }
    case (types.PROFILE_LOAD_RESPONSE): {
      return {
        ...state,
        isFetching: false,
        data: action.profile,
        followers: action.followers,
        following: action.following,
        isMe: action.isMe,
      };
    }
    case (types.IMAGE_UPLOAD_REQUEST): {
      return {
        ...state,
        uploadingImage: action.imageName,
      };
    }
    case (types.IMAGE_UPLOAD_RESPONSE): {
      return {
        ...state,
        uploadingImage: null,
        data: action.data,
      };
    }
    case (types.SAVE_CHANGES_REQUEST): {
      return {
        ...state,
        isSaving: true,
      };
    }
    case (types.SAVE_CHANGES_RESPONSE): {
      return {
        ...state,
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
