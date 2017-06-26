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
      return Object.assign({}, state, {
        isFetching: action.status,
      });
    case actionsTypes.AUTH_SUCCESS:
      return Object.assign({}, state, action.payload, {
        isFetching: false,
        errors: {},
      });
    case actionsTypes.AUTH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors,
      });
    case actionsTypes.ME_STORE:
      return Object.assign({}, state, {
        me: action.data,
        isFetching: false,
        isAuthenticated: true,
      });
    default:
      return state;
  }
};

export default authReducer;
