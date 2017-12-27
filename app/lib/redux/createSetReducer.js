/* eslint no-confusing-arrow: 0 */

function createSetReducer(type, initialState) {
  return (state = initialState, action) => action.type === type ? action.payload : state;
}

export default createSetReducer;
