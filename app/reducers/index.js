import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Sections from '../ducks/Sections';
import SubSections from '../ducks/SubSections';
import Blogs from '../ducks/Blogs';
import Events from '../ducks/Events';
import Products from '../ducks/Products';
import PostsSpecific from '../ducks/PostsSpecific';
import ProfilePosts from '../ducks/ProfilePosts';
import TopAuthors from '../ducks/TopAuthors';
import Auth from '../ducks/Auth';
import Popup from '../ducks/Popup';
import Comments from '../ducks/Comments';
import Support from '../ducks/Support';
import Dialogs from '../ducks/Dialogs';
import Geo from '../ducks/Geo';
import Posts from '../ducks/Posts';
import Profile from '../ducks/Profile/';
import Seo from '../ducks/Seo';
import Settings from '../ducks/Settings';
import Search from '../ducks/Search';
import PostCreate from '../ducks/PostCreate';
import PostPage from '../ducks/PostPage';
import TagSearch from '../ducks/TagSearch';
import Filters from '../ducks/Filters';
import RelativePage from '../ducks/Relative';
import NewIn from '../ducks/NewIn';
import CatalogPage from '../ducks/CatalogPage';
import Menu from '../ducks/Menu';

export default combineReducers({
  Sections,
  SubSections,
  Blogs,
  Events,
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
  routing: routerReducer,
  PostCreate,
  PostPage,
  TagSearch,
  Filters,
  RelativePage,
  NewIn,
  CatalogPage,
  Menu,
});
