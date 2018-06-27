import unionBy from 'lodash/unionBy';
import { handleActions } from 'redux-actions';

import { deleteImageRequest } from './actions/deleteImage';
import { uploadImageRequest, uploadImageResponse } from './actions/uploadImage';
import { changeFollowStatus, followUser, unfollowUser } from './actions/follow';
import { saveChangesRequest, saveChangesResponse, saveChangesError } from './actions/saveChanges';
import { selectPost, unselectPost, clearSelectedPosts } from './actions/selectedPostsActions';
import {
  loadProfileRequest,
  loadProfileResponse,
  moreFollowersRequest,
  moreFollowersResponse,
  moreFollowingRequest,
  moreFollowingResponse
} from './actions/loadProfile';
import { addContactError, addContactRequest, addContactResponse } from './actions/addContact';
import { deleteContactError, deleteContactRequest, deleteContactResponse } from './actions/deleteContact';
import {
  partialUpdateContactError, partialUpdateContactRequest, partialUpdateContactResponse
} from './actions/partialUpdateContact';

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
  /** Выбранные в магазине посты (для поднятия/удаления/архивировния) */
  selectedPosts: [],
  selectedPostsSlugs: []
};

const imagesActionsHandlers = {
  [deleteImageRequest](state, { payload }) {
    return ({
      ...state,
      data: {
        ...state.data,
        [payload]: null
      }
    });
  },
  [uploadImageRequest](state, { payload }) {
    return ({
      ...state,
      uploadingImage: payload
    });
  },
  [uploadImageResponse](state, { payload }) {
    return ({
      ...state,
      uploadingImage: null,
      data: payload
    });
  }
};

const followActionsHandlers = {
  [changeFollowStatus](state, { payload }) {
    return ({
      ...state,
      isFollowing: payload
    });
  },
  [followUser](state, { payload }) {
    return ({
      ...state,
      data: {
        ...state.data,
        followers_count: state.data.followers_count + 1,
        is_subscribed: true,
      },
      followers: [...state.followers, payload]
    });
  },
  [unfollowUser](state, { payload }) {
    return ({
      ...state,
      data: {
        ...state.data,
        followers_count: state.data.followers_count - 1,
        is_subscribed: false,
      },
      followers: state.followers.filter(follower => follower.id !== payload),
    });
  }
};

const saveChangesActionsHandlers = {
  [saveChangesRequest](state) {
    return ({
      ...state,
      isSaving: true,
    });
  },
  [saveChangesResponse](state, { payload }) {
    return ({
      ...state,
      data: payload,
      isSaving: false,
    });
  },
  [saveChangesError](state, { payload }) {
    return ({
      ...state,
      isSaving: false,
      errors: payload,
    });
  }
};

const loadProfileActionsHandlers = {
  [loadProfileRequest](state) {
    return ({
      ...state,
      isFetching: true,
      data: {}
    });
  },
  [loadProfileResponse](state, { payload }) {
    return ({
      ...state,
      isFetching: false,
      data: payload.profile,
      isMe: payload.isMe,
      // Подписчики
      followers: payload.followers.results,
      nextFollowersPage: 2,
      canLoadMoreFollowers: Boolean(payload.followers.next),
      // Подписки
      following: payload.following.results,
      nextFollowingPage: 2,
      canLoadMoreFollowing: Boolean(payload.following.next)
    });
  }
};

const followersActionsHandlers = {
  [moreFollowersRequest](state) {
    return ({
      ...state,
      isLoadingMoreFollowers: true
    });
  },
  [moreFollowersResponse](state, { payload }) {
    return ({
      ...state,
      isLoadingMoreFollowers: false,
      followers: [...state.followers, ...payload.results],
      nextFollowersPage: state.nextFollowersPage + 1,
      canLoadMoreFollowers: Boolean(payload.next)
    });
  }
};

const followingActionsHandlers = {
  [moreFollowingRequest](state) {
    return ({
      ...state,
      isLoadingMoreFollowing: true
    });
  },
  [moreFollowingResponse](state, { payload }) {
    return ({
      ...state,
      isLoadingMoreFollowing: false,
      following: [...state.following, ...payload.results],
      nextFollowingPage: state.nextFollowingPage + 1,
      canLoadMoreFollowing: Boolean(payload.next)
    });
  }
};

const addContactActionsHandlers = {
  [addContactRequest](state) {
    return {
      ...state,
      isSaving: true
    };
  },
  [addContactResponse](state, { payload }) {
    return {
      ...state,
      data: {
        ...state.data,
        contacts: [...state.data.contacts, payload],
      },
      isSaving: false,
    };
  },
  [addContactError](state, { payload }) {
    return {
      ...state,
      isSaving: false,
      errors: payload,
    };
  }
};

const deleteContactActionsHandlers = {
  [deleteContactRequest](state) {
    return {
      ...state,
      isSaving: true
    };
  },
  [deleteContactResponse](state, { payload }) {
    return {
      ...state,
      data: {
        ...state.data,
        contacts: state.data.contacts.filter(contact => contact.id !== payload),
      },
      isSaving: false
    };
  },
  [deleteContactError](state, { payload }) {
    return {
      ...state,
      isSaving: false,
      errors: payload
    };
  }
};

const partialUpdateContactActionsHandlers = {
  [partialUpdateContactRequest](state) {
    return {
      ...state,
      isSaving: true
    };
  },
  [partialUpdateContactResponse](state, { payload }) {
    return {
      ...state,
      data: {
        ...state.data,
        contacts: unionBy([payload], state.data.contacts, 'id'),
      },
      isSaving: false,
    };
  },
  [partialUpdateContactError](state, { payload }) {
    return {
      ...state,
      isSaving: false,
      errors: payload
    };
  }
};

const selectPostsActionsHandlers = {
  [selectPost](state, { payload }) {
    return ({
      ...state,
      selectedPosts: [...state.selectedPosts, payload],
      selectedPostsSlugs: [...state.selectedPostsSlugs, payload.slug]
    });
  },
  [unselectPost](state, { payload }) {
    return ({
      ...state,
      selectedPosts: state.selectedPosts.filter(({ slug }) => slug !== payload),
      selectedPostsSlugs: state.selectedPostsSlugs.filter(slug => slug !== payload)
    });
  },
  [clearSelectedPosts](state) {
    return ({
      ...state,
      selectedPosts: [],
      selectedPostsSlugs: []
    });
  }
};

export default handleActions({
  ...imagesActionsHandlers,
  ...followActionsHandlers,
  ...saveChangesActionsHandlers,
  ...loadProfileActionsHandlers,
  ...followersActionsHandlers,
  ...followingActionsHandlers,
  ...selectPostsActionsHandlers,
  ...addContactActionsHandlers,
  ...deleteContactActionsHandlers,
  ...partialUpdateContactActionsHandlers
}, initialState);
