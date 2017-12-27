import { SET_FOLLOW_STATUS } from './actions';
import createSetReducer from '../../lib/redux/createSetReducer';

const initialState = { isFetching: false };

const reducer = createSetReducer(SET_FOLLOW_STATUS, initialState);

export default reducer;
