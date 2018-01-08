import { Posts, Tags, Catalog } from '../../api';
import { setNetworkError } from '../NetworkErrors/reducer';

export const REQUEST_POSTS = 'catalog-page/REQUEST_POSTS';
export const RESPONSE_POSTS = 'catalog-page/RESPONSE_POSTS';

export const REQUEST_TAGS = 'catalog-page/REQUEST_TAGS';
export const RESPONSE_TAGS = 'catalog-page/RESPONSE_TAGS';

export const REQUEST_MORE_TAGS = 'catalog-page/REQUEST_MORE_TAGS';
export const RESPONSE_MORE_TAGS = 'catalog-page/RESPONSE_MORE_TAGS';

const requestPosts = () => ({
  type: REQUEST_POSTS,
});

const responsePosts = ({ count, results }) => ({
  type: RESPONSE_POSTS,
  count,
  results,
});

const requestTags = () => ({
  type: REQUEST_TAGS,
});

const responseTags = ({ next, results }) => ({
  type: RESPONSE_TAGS,
  next,
  results,
});

const requestMoreTags = () => ({
  type: REQUEST_MORE_TAGS,
});

const responseMoreTags = ({ next, results }) => ({
  type: RESPONSE_MORE_TAGS,
  next,
  results,
});

export const fetchPosts = options => (dispatch) => {
  dispatch(requestPosts());

  return Posts.getPosts({ type: 1, ...options })
    .then(res => dispatch(responsePosts(res.data)));
};

export const fetchTags = options => (dispatch) => {
  dispatch(requestTags());

  return Tags.getTags(options)
    .then(res => dispatch(responseTags(res.data)));
};

export const fetchMoreTags = options => (dispatch) => {
  dispatch(requestMoreTags());

  return Tags.getTags(options)
    .then(res => dispatch(responseMoreTags(res.data)));
};


// TODO:
// Сделать этот запрос основным способом загрузить массив текущих категори
// Выпилить createTree из containers/Section/preloader
// Сделать состояния для данного запроса
export const fetchCrumbs = options => (dispatch) => {
  return Catalog.getCategoryCrumbs(options)
    .catch(({ response }) => {
      dispatch(setNetworkError(response));
    });
};
