import { connect } from 'react-redux';
import UsersPopup from './UsersPopup';

import { loadMoreFollowing } from 'ducks/Profile/actions/loadProfile';

class Following extends UsersPopup {
  title = this.translater('Following');
  blankText = this.translater('No.following');
}

const mapProps = state => ({
  items: state.Profile.following,
  isLoadingMore: state.Profile.isLoadingMoreFollowing,
  nextPage: state.Profile.nextFollowingPage,
  canLoadMore: state.Profile.canLoadMoreFollowing,
  isMe: state.Profile.isMe,
  profile: state.Profile.data,
  isAuth: state.Profile.isAuthenticated,
});

const mapDispatch = dispatch => ({
  loadMore: (id, isMe, isAuth, options) => dispatch(
    loadMoreFollowing(id, isMe, isAuth, options)),
});

export default connect(mapProps, mapDispatch)(Following);
