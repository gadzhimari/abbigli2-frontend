/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import IndexRedirect from 'react-router/lib/IndexRedirect';
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

function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function resolveNotFoundComponent(nextState, cb) {
  System.import('containers/NotFound/NotFound')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

/**
 * Our routes.
 *
 * NOTE: We load our routes asynhronously using the `getComponent` API of
 * react-router, doing so combined with the `System.import` support by
 * webpack 2 allows us to get code splitting based on our routes.
 * @see https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
 * @see https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6
 */
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="page/about" component={About} />
    <Route path="page/faq" component={Faq} />
    <Route path="page/agreement" component={Agreement} />
    <Route path="questions" component={Questions} />
    <Route path="sections/:section" component={Sections} />
    <Route path="sections/:section/:tag" component={SectionTag} />
    <Route path="tags/:tags(/:page)" component={Tag} />
    {/*<Route path="post/:slug" component={ProductPage}/>*/}

    <Route path="post/new" component={PostCreate}/>
    <Route path="profile/:profile/post/edit/:slug" component={PostEdit}/>

    <Route path="profile/:profile" component={Profile}>
      <IndexRoute component={ProfileMyabbigli} />
      <IndexRedirect to="myabbigli" />
      <Route path="myabbigli" component={ProfileMyabbigli}/>
      <Route path="favorites" component={ProfileFavorites}/>
      <Route path="feed" component={ProfileFeed}/>
      <Route path="messages" component={ProfileMessages}/>
    </Route>

    <Route path="blogs" component={BlogsPage}/>
    <Route path="events" component={EventsPage}/>
    <Route path="event/:slug" component={EventPage}/>
    <Route path="blog/:slug" component={BlogPage}/>
    <Route path="post/:slug" component={ProductPage}/>

    <Route path="new-products" component={SpecificPostsPage} slug="new"/>
    <Route path="popular-products" component={SpecificPostsPage} slug="popular"/>
    <Route path="set-the-mood" component={SpecificPostsPage} slug="mood"/>
    <Route path="nearest-products" component={SpecificPostsPage} slug="near"/>

    <Route path="?provider=fb&code=:code#_=_" provider="fb" getComponent={App} />
  </Route>
);

export default routes;
