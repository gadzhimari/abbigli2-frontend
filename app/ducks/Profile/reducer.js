import unionBy from 'lodash/unionBy';
import * as types from './actions/types';

const initialState = {
  /** Статус загрузки данных о профиле */
  isFetching: true,
  /** Данные текущего профиля */
  data: {},
  /** Подписчики пользователя */
  followers: [],
  isLoadingMoreFollowers: false,
  nextFollowersPage: null,
  canLoadMoreFollowers: false,
  isFollowing: false,
  /** Подписки пользователя */
  following: null,
  isLoadingMoreFollowing: false,
  nextFollowingPage: null,
  canLoadMoreFollowing: false,
  /** Содержит name текущего загружаемого изображения */
  uploadingImage: null,
  /** Указывает текущего ли юзера загружен профиль */
  isMe: false,
  /** Статус сохранения данных профиля */
  isSaving: false,
  /** Ошибки редактирования профиля */
  errors: {},
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
        isMe: action.isMe,
        followers: action.followers.results,
        nextFollowersPage: 2,
        canLoadMoreFollowers: !!action.followers.next,
        following: action.following.results,
        nextFollowingPage: 2,
        canLoadMoreFollowing: !!action.following.next,
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
        isSaving: false,
      };
    }
    case (types.SAVE_CHANGES_ERROR): {
      return {
        ...state,
        isSaving: false,
        errors: action.data,
      };
    }
    case (types.ADD_CONTACT_REQUEST):
    case (types.DELETE_CONTACT_REQUEST):
    case (types.PARTIAL_UPDATE_CONTACT_REQUEST): {
      return {
        ...state,
        isSaving: true,
      };
    }
    case (types.ADD_CONTACT_RESPONSE): {
      return {
        ...state,
        data: {
          ...state.data,
          contacts: [...state.data.contacts, action.data],
        },
        isSaving: false,
      };
    }
    case (types.DELETE_CONTACT_RESPONSE): {
      return {
        ...state,
        data: {
          ...state.data,
          contacts: state.data.contacts.filter(contact => contact.id !== action.payload),
        },
        isSaving: false,
      };
    }
    case (types.PARTIAL_UPDATE_CONTACT_RESPONSE): {
      return {
        ...state,
        data: {
          ...state.data,
          contacts: unionBy([action.data], state.data.contacts, 'id'),
        },
        isSaving: false,
      };
    }
    case (types.ADD_CONTACT_ERROR):
    case (types.REMOVE_CONTACT_ERROR):
    case (types.PARTIAL_UPDATE_CONTACT_ERROR): {
      return {
        ...state,
        isSaving: false,
        errors: action.data,
      };
    }
    case (types.IMAGE_DELETE_REQUEST): {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
        },
      };
    }
    case (types.MORE_FOLLOWERS_REQUEST): {
      return {
        ...state,
        isLoadingMoreFollowers: true,
      };
    }
    case (types.MORE_FOLLOWERS_RESPONSE): {
      return {
        ...state,
        isLoadingMoreFollowers: false,
        followers: [...state.followers, ...action.data.results],
        nextFollowersPage: state.nextFollowersPage + 1,
        canLoadMoreFollowers: !!action.data.next,
      };
    }
    case (types.MORE_FOLLOWING_REQUEST): {
      return {
        ...state,
        isLoadingMoreFollowing: true,
      };
    }
    case (types.MORE_FOLLOWING_RESPONSE): {
      return {
        ...state,
        isLoadingMoreFollowing: false,
        following: [...state.following, ...action.data.results],
        nextFollowingPage: state.nextFollowingPage + 1,
        canLoadMoreFollowing: !!action.data.next,
      };
    }
    case (types.CHANGE_FOLLOWING_STATUS): {
      return {
        ...state,
        isFollowing: action.payload,
      };
    }
    case (types.FOLLOW_USER): {
      return {
        ...state,
        data: {
          ...state.data,
          followers_count: state.data.followers_count + 1,
          is_subscribed: true,
        },
        followers: [...state.followers, action.payload],
      };
    }
    case (types.UNFOLLOW_USER): {
      return {
        ...state,
        data: {
          ...state.data,
          followers_count: state.data.followers_count - 1,
          is_subscribed: false,
        },
        followers: state.followers.filter(follower => follower.id !== action.payload),
      };
    }
    case (types.UPDATE_PROFILE): {
      return {
        ...state,
        data: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
