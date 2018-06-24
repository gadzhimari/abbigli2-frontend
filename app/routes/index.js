/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import {
  App,
  Home,
  Questions,
  Sections,
  Tag,
  ProductPage,
  Profile,
  ProfileLK,
  ProfileRaiseAds,
  ProfileMyabbigli,
  ProfileFavorites,
  ProfileFeed,
  EventsPage,
  EventPage,
  BlogPage,
  BlogsPage,
  SpecificPostsPage,
  PostCreate,
  RelativePage,
  Faq,
  Agreement,
  PeopleSearch,
  ProfileAbout,
  ForMasters,
  ProfileBlogs,
  ProfileEvents,
  About,
  PrivacyPolicy
} from '../containers';

import Chat from '../containers/Chat';
import SettingsPage from '../containers/SettingsPage';

import pages from '../lib/pages';

const isProduction = process.env.NODE_ENV === 'production';

function getRoutes(store) {
  function redirectForUnautorized(nextState, replace, callback) {
    const { Auth } = store.getState();

    if (!Auth.isAuthenticated) {
      replace('/');
    }

    callback();
  }


  return (
    <Route path={pages.ROOT_PAGE.path} component={App}>
      <IndexRoute component={Home} />
      <Route path={pages.FAQ_PAGE.path} component={Faq} mustScroll />
      <Route path={pages.ABOUT_PAGE.path} component={About} mustScroll />
      <Route path={pages.AGREEMENT_PAGE.path} component={Agreement} />
      <Route path={pages.AGREEMENT_PAGE.path} component={Agreement} mustScroll />
      <Route path={pages.PRIVACY_PAGE.path} component={PrivacyPolicy} mustScroll />
      <Route path={pages.FOR_MASTERS_PAGE.path} component={ForMasters} mustScroll />
      <Route path={pages.QUESTIONS_PAGE.path} component={Questions} mustScroll />
      <Route path={pages.SEARCH_PAGE.path} component={Tag} mustScroll />
      <Route path={pages.PEOPLE_SEARCH.path} component={PeopleSearch} mustScroll />
      <Route path={pages.CHAT_PAGE.path} component={Chat} mustScroll />

      <Route path={pages.CREATE_PAGE.path} component={PostCreate} onEnter={redirectForUnautorized} mustScroll />
      <Route path={pages.EDIT_PAGE.path} component={PostCreate} onEnter={redirectForUnautorized} mustScroll />

      <Route path={pages.PROFILE_PAGE.path} component={Profile} >
        <IndexRoute component={ProfileMyabbigli} />
        <Route path={pages.FAVORITES_PAGE.path} component={ProfileFavorites} />
        <Route path={pages.FEED_PAGE.path} component={ProfileFeed} />
        <Route path={pages.PROFILE_BLOGS_PAGE.path} component={ProfileBlogs} />
        <Route path={pages.PROFILE_EVENTS_PAGE.path} component={ProfileEvents} />

        {!isProduction &&
          <Route path={pages.LK_PAGE.path} component={ProfileLK} />
        }

        <Route path={pages.ABOUT_PROFILE_PAGE.path} component={ProfileAbout} mustScroll />
      </Route>

      {!isProduction &&
        <Route path={pages.RAISE_ADS_PAGE.path} component={ProfileRaiseAds} mustScroll />
      }

      <Route path={pages.SETTINGS_PAGE.path} component={SettingsPage} />

      <Route path={pages.BLOGS_PAGE.path} component={BlogsPage} mustScroll />
      <Route path={pages.EVENTS_PAGE.path} component={EventsPage} mustScroll />
      <Route path={pages.EVENT_PAGE.path} component={EventPage} mustScroll />
      <Route path={pages.BLOG_PAGE.path} component={BlogPage} mustScroll />
      <Route path={pages.PRODUCT_PAGE.path} component={ProductPage} mustScroll />
      <Route path={pages.RELATIVE_PRODUCTS_PAGE.path} component={RelativePage} mustScroll />

      <Route path={pages.NEW_PRODUCTS_PAGE.path} component={SpecificPostsPage} filter="New" mustScroll />
      <Route path={pages.POPULAR_PRODUCTS_PAGE.path} component={SpecificPostsPage} filter="Popular" mustScroll />
      <Route path={pages.MOOD_PAGE.path} component={SpecificPostsPage} filter="Mood" mustScroll />
      <Route path={pages.NEAR_PAGE.path} component={SpecificPostsPage} filter="Near" mustScroll />

      <Route path={pages.CATALOG_PAGE.path} component={Sections} mustScroll />
    </Route>
  );
}

export default getRoutes;
