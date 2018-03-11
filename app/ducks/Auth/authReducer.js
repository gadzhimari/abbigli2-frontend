import * as actionsTypes from './actionsTypes';

const initialState = {
  isFetching: false,
  confirm: false,
  me: {},
  isAuthenticated: false,
  errors: {},
  registerStage: 'register', // one of register, confirm, password
  loginStage: 'login', // one of login, reset, confirm, password
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_REQUEST:
      return {
        ...state,
        isFetching: action.status,
      };
    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        errors: {},
      };
    case actionsTypes.AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    case actionsTypes.SET_ME:
      return {
        ...state,
        me: { ...action.payload },
        isFetching: false,
        isAuthenticated: true,
      };
    case actionsTypes.SET_ME_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
