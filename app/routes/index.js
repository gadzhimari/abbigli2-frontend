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
  EventsPage,
  EventPage,
  BlogPage,
  BlogsPage,
  SectionTag,
  SpecificPostsPage,
  PostCreate,
  PostEdit,
  Faq,
  Chat,
  Agreement,
} from 'containers';

if (IS_HOT_DEVELOPMENT) {
  // HMR falls over when a Route uses a dynamic component resolution
  // property (i.e. getComponent or getComponents).  As a workaround for any
  // of your components that are resolved dynamically please require them below.
  require('../containers/NotFound/NotFound'); // eslint-disable-line global-require
}


const routes = (store, token, shouldPreload, isBot) => {
  const componentFn = (Component, value) => (nextState, replace, callback) => Component[value]({
    store,
    token,
    shouldPreload,
  }, nextState, replace, callback);

  const handleNoAuth = (nextState, replace) => {
    const state = store.getState();

    if (!state.Auth.isAuthenticated) replace('/');
  };

  const botDataFetching = Component => isBot
    ? componentFn(Component, 'prerenderData')
    : (_, _1, callback) => callback();

  return (
    <Route path="/" component={App} onEnter={componentFn(App, 'fetchData')} >
      <IndexRoute component={Home} onEnter={botDataFetching(Home)} />
      <Route path="page/about" component={About} />
      <Route path="page/faq" component={Faq} />
      <Route path="page/agreement" component={Agreement} />
      <Route path="questions" component={Questions} />
      <Route path="sections/:section" component={Sections} onEnter={botDataFetching(Sections)} />
      <Route path="sections/:section/:tags/new" component={SectionTag} slug="new" onEnter={botDataFetching(SectionTag)} />
      <Route path="sections/:section/:tags/popular" component={SectionTag} filter="popular" onEnter={botDataFetching(SectionTag)} />
      <Route path="sections/:section/:tags/nearest" component={SectionTag} filter="near" onEnter={botDataFetching(SectionTag)} />
      <Route path="tags/:tags/:filter(/:page)" component={Tag} onEnter={botDataFetching(Tag)} />

      <Route path="post/new" component={PostCreate} onEnter={handleNoAuth} />
      <Route path="profile/:profile/post/edit/:slug" component={PostEdit} />

      <Route path="profile/(:profile)" component={Profile} onEnter={botDataFetching(Profile)} >
        <IndexRoute component={ProfileMyabbigli} onEnter={botDataFetching(ProfileMyabbigli)} />
        <Route path="favorites" component={ProfileFavorites} onEnter={botDataFetching(ProfileFavorites)} />
        <Route path="feed" component={ProfileFeed} onEnter={botDataFetching(ProfileFeed)} />
      </Route>
      <Route path="chat" component={Chat} />

      <Route path="blogs(/:filter)" component={BlogsPage} onEnter={botDataFetching(BlogsPage)} />
      <Route path="events" component={EventsPage} onEnter={botDataFetching(EventsPage)} />
      <Route path="event/:slug" component={EventPage} />
      <Route path="blog/:slug" component={BlogPage} />
      <Route path="post/:slug" component={ProductPage} />

      <Route path="new-products" component={SpecificPostsPage} slug="new" />
      <Route path="popular-products" component={SpecificPostsPage} filter="popular" />
      <Route path="set-the-mood" component={SpecificPostsPage} slug="mood" />
      <Route path="nearest-products" component={SpecificPostsPage} filter="near" />

      <Route path="new-products/:section" onEnter={botDataFetching(SectionTag)} component={SectionTag} />
      <Route path="popular-products/:section" component={SectionTag} onEnter={botDataFetching(SectionTag)} filter="popular" />
      <Route path="nearest-products/:section" component={SectionTag} onEnter={botDataFetching(SectionTag)} filter="near" />
    </Route>
  );
};

export default routes;
