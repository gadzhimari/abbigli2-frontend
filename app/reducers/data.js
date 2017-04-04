const initialState = {
  isFetching: false,
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return Object.assign({}, state, {
        items: action.data.results,
      })
    case 'REQUEST_DATA':
      return Object.assign({}, {
        isFetching: true,
        items: []
      })
    default:
      return state;
  }
}