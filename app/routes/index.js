/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import { IS_HOT_DEVELOPMENT } from '../config';
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
  ProfileMessages,
  EventsPage,
  EventPage,
  BlogPage,
  BlogsPage,
  SectionTag,
  SpecificPostsPage,
  PostCreate,
  PostEdit,
  Faq,
  Agreement,
} from 'containers';

if (IS_HOT_DEVELOPMENT) {
  // HMR falls over when a Route uses a dynamic component resolution
  // property (i.e. getComponent or getComponents).  As a workaround for any
  // of your components that are resolved dynamically please require them below.
  require('../containers/NotFound/NotFound'); // eslint-disable-line global-require
}


const routes = (store, token) => {
  const componentFn = (Component, value) => (nextState, replace, callback) => Component[value]({
    store,
    token,
  }, nextState, replace, callback);

  const handleNoAuth = (nextState, replace) => {
    const state = store.getState();

    if (!state.Auth.isAuthenticated) replace('/');
  };

  return (
    <Route path="/" component={App} onEnter={componentFn(App, 'fetchData')} >
      <IndexRoute component={Home} />
      <Route path="page/about" component={About} />
      <Route path="page/faq" component={Faq} />
      <Route path="page/agreement" component={Agreement} />
      <Route path="questions" component={Questions} />
      <Route path="sections/:section" component={Sections} />
      <Route path="sections/:section/:tag" component={SectionTag} />
      <Route path="tags/:tags(/:page)" component={Tag} />

      <Route path="post/new" component={PostCreate} onEnter={handleNoAuth} />
      <Route path="profile/:profile/post/edit/:slug" component={PostEdit} />

      <Route path="profile/(:profile)" component={Profile} >
        <IndexRoute component={ProfileMyabbigli} />
        <Route path="favorites" component={ProfileFavorites} />
        <Route path="feed" component={ProfileFeed} />
        <Route path="messages" component={ProfileMessages} />
      </Route>

      <Route path="blogs" component={BlogsPage} />
      <Route path="events" component={EventsPage} />
      <Route path="event/:slug" component={EventPage} />
      <Route path="blog/:slug" component={BlogPage} />
      <Route path="post/:slug" component={ProductPage} />

      <Route path="new-products" component={SpecificPostsPage} slug="new" />
      <Route path="popular-products" component={SpecificPostsPage} slug="popular" />
      <Route path="set-the-mood" component={SpecificPostsPage} slug="mood" />
      <Route path="nearest-products" component={SpecificPostsPage} slug="near" />
    </Route>
  );
};

export default routes;
