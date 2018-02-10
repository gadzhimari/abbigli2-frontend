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
  About
} from '../containers';

import Chat from '../containers/Chat';
import SettingsPage from '../containers/SettingsPage';

import pages from '../lib/pages';

const routes = (
  <Route path={pages.ROOT_PAGE.path} component={App} >
    <IndexRoute component={Home} />
    <Route path={pages.FAQ_PAGE.path} component={Faq} />
    <Route path={pages.ABOUT_PAGE.path} component={About} />
    <Route path={pages.AGREEMENT_PAGE.path} component={Agreement} />
    <Route path={pages.QUESTIONS_PAGE.path} component={Questions} />
    <Route path={pages.SEARCH_PAGE.path} component={Tag} />
    <Route path={pages.PEOPLE_SEARCH.path} component={PeopleSearch} />
    <Route path={pages.SEARCH_PAGE.path} component={Chat} />

    <Route path={pages.CREATE_PAGE.path} component={PostCreate} />
    <Route path={pages.EDIT_PAGE.path} component={PostCreate} />

    <Route path={pages.PROFILE_PAGE.path} component={Profile} >
      <IndexRoute component={ProfileMyabbigli} />
      <Route path={pages.FAVORITES_PAGE.path} component={ProfileFavorites} mustScroll={false} />
      <Route path={pages.FEED_PAGE.path} component={ProfileFeed} mustScroll={false} />
      <Route path={pages.ABOUT_PROFILE_PAGE.path} component={ProfileAbout} mustScroll={false} />
    </Route>

    <Route path={pages.SETTINGS_PAGE.path} component={SettingsPage} />

    <Route path={pages.BLOGS_PAGE.path} component={BlogsPage} />
    <Route path={pages.EVENTS_PAGE.path} component={EventsPage} />
    <Route path={pages.EVENT_PAGE.path} component={EventPage} />
    <Route path={pages.BLOG_PAGE.path} component={BlogPage} />
    <Route path={pages.PRODUCT_PAGE.path} component={ProductPage} />
    <Route path={pages.RELATIVE_PRODUCTS_PAGE.path} component={RelativePage} />

    <Route path={pages.NEW_PRODUCTS_PAGE.path} component={SpecificPostsPage} filter="New" />
    <Route path={pages.POPULAR_PRODUCTS_PAGE.path} component={SpecificPostsPage} filter="Popular" />
    <Route path={pages.MOOD_PAGE.path} component={SpecificPostsPage} filter="Mood" />
    <Route path={pages.NEAR_PAGE.path} component={SpecificPostsPage} filter="Near" />

    <Route path={pages.CATALOG_PAGE.path} component={Sections} />
  </Route>
);

export default routes;
