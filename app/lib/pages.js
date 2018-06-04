import { fetchPost } from '../ducks/PostPage/actions';
import { fetchCrumbs } from '../ducks/CatalogPage/actions';

export default {
  ROOT_PAGE: {
    path: '/'
  },
  FAQ_PAGE: {
    path: 'page/faq'
  },
  ABOUT_PAGE: {
    path: 'page/about'
  },
  AGREEMENT_PAGE: {
    path: 'page/agreement'
  },
  PRIVACY_PAGE: {
    path: 'page/policy-privacy'
  },
  FOR_MASTERS_PAGE: {
    path: 'page/for-masters',
  },
  QUESTIONS_PAGE: {
    path: 'questions'
  },
  SEARCH_PAGE: {
    path: 'find'
  },
  PEOPLE_SEARCH: {
    path: 'people'
  },
  CHAT_PAGE: {
    path: 'chat'
  },
  CREATE_PAGE: {
    path: 'post/new'
  },
  EDIT_PAGE: {
    path: 'profile/:profile/post/edit/:slug'
  },
  PROFILE_PAGE: {
    path: 'profile/(:profile)'
  },
  FAVORITES_PAGE: {
    path: 'favorites'
  },
  FEED_PAGE: {
    path: 'feed'
  },
  ABOUT_PROFILE_PAGE: {
    path: 'about'
  },
  SETTINGS_PAGE: {
    path: 'settings'
  },
  BLOGS_PAGE: {
    path: 'blogs'
  },
  BLOG_PAGE: {
    path: 'blog/:slug',
    action: fetchPost,
    actionArgs: ['params.slug', 'token']
  },
  EVENTS_PAGE: {
    path: 'events'
  },
  EVENT_PAGE: {
    path: 'event/:slug',
    action: fetchPost,
    actionArgs: ['params.slug', 'token']
  },
  PRODUCT_PAGE: {
    path: 'post/:slug',
    action: fetchPost,
    actionArgs: ['params.slug', 'token']
  },
  RELATIVE_PRODUCTS_PAGE: {
    path: 'relative/:slug'
  },
  NEW_PRODUCTS_PAGE: {
    path: 'new-products'
  },
  POPULAR_PRODUCTS_PAGE: {
    path: 'popular-products'
  },
  MOOD_PAGE: {
    path: 'set-the-mood'
  },
  NEAR_PAGE: {
    path: 'nearest-products'
  },
  CATALOG_PAGE: {
    path: '(**/):section',
    action(params) {
      let slugs = [params.section];
      if (params[0]) {
        slugs = params[0].split('/').concat(slugs);
      }

      return dispatch => dispatch(fetchCrumbs({ slugs }));
    },
    actionArgs: ['params']
  },
};
