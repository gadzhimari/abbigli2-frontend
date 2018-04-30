import { combineReducers } from 'redux';

import Follow from '../ducks/Follow';
import Sections from '../ducks/Sections';
import Blogs from '../ducks/Blogs';
import Events from '../ducks/Events';
import Products from '../ducks/Products';
import PostsSpecific from '../ducks/PostsSpecific';
import ProfilePosts from '../ducks/ProfilePosts';
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
import NetworkErrors from '../ducks/NetworkErrors';
import settlement from '../ducks/settlement';
import isTouch from '../ducks/isTouch';
import Location from '../ducks/Location';
import PeopleSearch from '../ducks/PeopleSearch';

export default combineReducers({
  Auth,
  settlement,
  Sections,
  Blogs,
  Events,
  Products,
  PostsSpecific,
  ProfilePosts,
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
  Follow,
  PostCreate,
  PostPage,
  TagSearch,
  Filters,
  RelativePage,
  NewIn,
  CatalogPage,
  NetworkErrors,
  isTouch,
  Location,
  PeopleSearch
});
