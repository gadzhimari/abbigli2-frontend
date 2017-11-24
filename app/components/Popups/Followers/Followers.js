import { connect } from 'react-redux';
import UsersPopup from './UsersPopup';

import { loadMoreFollowers } from 'ducks/Profile/actions/loadProfile';

class Followers extends UsersPopup {
  title = this.translater('Followers');
  blankText = this.translater('No results');
}

const mapProps = state => ({
  items: state.Profile.followers,
  isLoadingMore: state.Profile.isLoadingMoreFollowers,
  nextPage: state.Profile.nextFollowersPage,
  canLoadMore: state.Profile.canLoadMoreFollowers,
  isMe: state.Profile.isMe,
  profile: state.Profile.data,
  isAuth: state.Profile.isAuthenticated,
});

const mapDispatch = dispatch => ({
  loadMore: (id, isMe, isAuth, options) => dispatch(
    loadMoreFollowers(id, isMe, isAuth, options)),
});

export default connect(mapProps, mapDispatch)(Followers);
