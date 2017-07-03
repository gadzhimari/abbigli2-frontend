import { combineReducers } from 'redux';

// Reducers
import Sections from 'ducks/Sections';
import SubSections from 'ducks/SubSections';
import Blogs from 'ducks/Blogs';
import BlogsPopular from 'ducks/BlogsPopular';
import BlogPost from 'ducks/BlogPost';
import Events from 'ducks/Events';
import EventsPopular from 'ducks/EventsPopular';
import Products from 'ducks/Products';
import PostsSpecific from 'ducks/PostsSpecific';
import ProfilePosts from 'ducks/ProfilePosts';
import TopAuthors from 'ducks/TopAuthors';
import Auth from 'ducks/Auth';
import Popup from 'ducks/Popup';
import Comments from 'ducks/Comments';
import Support from 'ducks/Support';
import Dialogs from 'ducks/Dialogs';
import Geo from 'ducks/Geo';
import Posts from 'ducks/Posts';
import Profile from 'ducks/Profile';
import Seo from 'ducks/Seo';
import Settings from 'ducks/Settings';
import Search from 'ducks/Search';
import Menu from 'ducks/Menu';
import PostCreate from 'ducks/PostCreate';
import Follow from 'actions/follow';
import PostPage from 'ducks/PostPage';
import TagSearch from 'ducks/TagSearch';
import Filters from 'ducks/Filters';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  Sections,
  SubSections,
  Blogs,
  BlogsPopular,
  BlogPost,
  Events,
  EventsPopular,
  Products,
  PostsSpecific,
  ProfilePosts,
  TopAuthors,
  Auth,
  Popup,
  Comments,
  Dialogs,
  Posts,
  Geo,
  Support,
  Profile,
  Seo,
  Settings,
  Search,
  Menu,
  routing: routerReducer,
  Follow,
  PostCreate,
  PostPage,
  TagSearch,
  Filters,
});
