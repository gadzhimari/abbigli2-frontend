import { fetchPost } from '../ducks/PostPage/actions';

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
    action: fetchPost
  },
  EVENTS_PAGE: {
    path: 'events'
  },
  EVENT_PAGE: {
    path: 'event/:slug'
  },
  PRODUCT_PAGE: {
    path: 'post/:slug'
  },
  RELATIVE_PRODUCTS_PAGE: {
    path: 'relative/:slug'
  },
  NEW_PRODUCTS_PAGE: {
    path: 'new-product'
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
    path: '(**/):section'
  },
};
