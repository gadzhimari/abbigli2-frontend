import { fetchPost } from '../ducks/PostPage/actions';
import { fetchCatalogPageData } from '../ducks/CatalogPage/actions';

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
    path: '/edit/:type/:slug'
  },
  PROFILE_PAGE: {
    path: 'profile/(:profile)'
  },
  PROFILE_BLOGS_PAGE: {
    path: 'blogs'
  },
  PROFILE_EVENTS_PAGE: {
    path: 'events'
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
    action: fetchPost.bind(null, 'post'),
    actionArgs: ['params.slug', 'token']
  },
  EVENTS_PAGE: {
    path: 'events'
  },
  EVENT_PAGE: {
    path: 'event/:slug',
    action: fetchPost.bind(null, 'event'),
    actionArgs: ['params.slug', 'token']
  },
  PRODUCT_PAGE: {
    path: 'post/:slug',
    action: fetchPost.bind(null, 'product'),
    actionArgs: ['params.slug', 'token']
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
  LK_PAGE: {
    path: 'lk(/:tab)'
  },
  RAISE_ADS_PAGE: {
    path: 'raise-ads',
  },
  ACTIVE_PAGE: {
    path: 'active'
  },
  ARCHIVE_PAGE: {
    path: 'archive'
  },
  CATALOG_PAGE: {
    path: '(**/):section',
    action: fetchCatalogPageData,
    actionArgs: ['params', 'query']
  }
};
