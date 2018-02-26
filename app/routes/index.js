/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import {
  App,
  Home,
  About,
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
} from '../containers';

import Chat from '../containers/Chat';
import SettingsPage from '../containers/SettingsPage';

const routes = (store, token, shouldPreload) => {
  const componentFn = (Component, value) => (nextState, replace, callback) => Component[value]({
    store,
    token,
    shouldPreload,
  }, nextState, replace, callback);

  const handleNoAuth = (nextState, replace) => {
    const state = store.getState();

    if (!state.Auth.isAuthenticated) {
      replace('/');
    }
  };

  return (
    <Route path="/" component={App} onEnter={componentFn(App, 'fetchData')} >
      <IndexRoute component={Home} />
      {/*
        <Route path="page/about" component={About} />
      */}
      <Route path="page/faq" component={Faq} />
      <Route path="page/agreement" component={Agreement} />
      <Route path="questions" component={Questions} />
      <Route path="tags/:tags/:filter(/:page)" component={Tag} />
      <Route path="find" component={Tag} />
      <Route path="people" component={PeopleSearch} />
      <Route path="chat" component={Chat} />

      <Route path="post/new" component={PostCreate} onEnter={handleNoAuth} />
      <Route path="profile/:profile/post/edit/:slug" component={PostCreate} onEnter={handleNoAuth} />

      <Route path="profile/(:profile)" component={Profile} >
        <IndexRoute component={ProfileMyabbigli} />
        <Route path="favorites" component={ProfileFavorites} />
        <Route path="feed" component={ProfileFeed} />
        <Route path="about" component={ProfileAbout} />
      </Route>

      <Route path="settings" component={SettingsPage} onEnter={handleNoAuth} />

      <Route path="blogs" component={BlogsPage} />
      <Route path="events" component={EventsPage} />
      <Route path="event/:slug" component={EventPage} />
      <Route path="blog/:slug" component={BlogPage} />
      <Route path="post/:slug" component={ProductPage} />
      <Route path="relative/:slug" component={RelativePage} />

      <Route path="new-products" component={SpecificPostsPage} filter="New" />
      <Route path="popular-products" component={SpecificPostsPage} filter="Popular" />
      <Route path="set-the-mood" component={SpecificPostsPage} filter="Mood" />
      <Route path="nearest-products" component={SpecificPostsPage} filter="Near" />

      <Route path="(**/):section" component={Sections} />
    </Route>
  );
};

export default routes;
