import { Posts } from 'API';
import * as actions from '../actionTypes';

const request = () => ({
  type: actions.REQUEST_POPULAR,
});

const response = popularPosts => ({
  type: actions.RESPONSE_POPULAR,
  popularPosts,
});

const fetchPopular = type => (dispatch) => {
  dispatch(request);

  return Posts.getPosts({ type, popular: true })
    .then(res => dispatch(response(res.data.results)));
};

export default fetchPopular;
