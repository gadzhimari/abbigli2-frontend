import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';
import UsersPopup from './UsersPopup';

import { loadMoreFollowing } from '../../../ducks/Profile/actions/loadProfile';

class Following extends UsersPopup {
  title = this.translater('Following');
  blankText = this.translater('No.following');
}

const mapStateToProps = state => ({
  items: state.Profile.following,
  isLoadingMore: state.Profile.isLoadingMoreFollowing,
  nextPage: state.Profile.nextFollowingPage,
  canLoadMore: state.Profile.canLoadMoreFollowing,
  isMe: state.Profile.isMe,
  profile: state.Profile.data,
  isAuth: state.Profile.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  loadMore: (id, isMe, isAuth, options) => dispatch(
    loadMoreFollowing(id, isMe, isAuth, options)),
});

const enhance = compose(connect(mapStateToProps,
  mapDispatchToProps), popupHOC);

export default enhance(Following);
