import { connect } from 'react-redux';
import { compose } from 'recompose';
import popupHOC from '../../../HOC/popupHOC';
import UsersPopup from './UsersPopup';

import { loadMoreFollowers } from '../../../ducks/Profile/actions/loadProfile';

class Followers extends UsersPopup {
  title = this.translater('Followers');
  blankText = this.translater('No.followers');
}

const mapStateToProps = state => ({
  items: state.Profile.followers,
  isLoadingMore: state.Profile.isLoadingMoreFollowers,
  nextPage: state.Profile.nextFollowersPage,
  canLoadMore: state.Profile.canLoadMoreFollowers,
  isMe: state.Profile.isMe,
  profile: state.Profile.data,
  isAuth: state.Profile.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  loadMore: (id, isMe, isAuth, options) => dispatch(
    loadMoreFollowers(id, isMe, isAuth, options)),
});

const enhance = compose(connect(mapStateToProps,
  mapDispatchToProps), popupHOC);

export default enhance(Followers);
