import * as actions from './actionTypes';

const initialState = {
  section: null,
  priceFrom: '0',
  priceTo: '1000',
  anyPrice: false,
  color: '',
  radius: '1000',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actions.UPDATE_FILTER): {
      return Object.assign({}, state, {
        [action.field]: action.value,
      });
    }
    case (actions.RESET_FILTER): {
      return Object.assign({}, initialState);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
