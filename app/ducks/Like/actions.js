import { createAction } from 'redux-actions';
import { Posts } from '../../api';
import onlyAuthAction from '../../lib/redux/onlyAuthAction';

const setLikeRequest = createAction('LIKE_SET_REQUEST');
const setLikeSuccess = createAction('LIKE_SET_SUCCESS');
const setLikeFailure = createAction('LIKE_SET_FAILED');

const setLike = slug => async (dispatch) => {
  dispatch(setLikeRequest());
  try {
    await Posts.likePost(slug);
    dispatch(setLikeSuccess());
  } catch (e) {
    dispatch(setLikeFailure());
  }
};

export default onlyAuthAction(setLike);
