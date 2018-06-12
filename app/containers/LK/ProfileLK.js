import { connect } from 'react-redux';

import { React, Component, cn } from '../../components-lib/__base';
import { Tabs } from '../../components-lib';

import ShopPage from './ShopPage/ShopPage';
import ActivePostsPage from './ActivePostsPage/ActivePostsPage';
import ArchivePage from './ArchivePage/ArchivePage';

import ProfileBanners from '../Profile/components/ProfileBanners';

import * as actions from '../../ducks/ProfilePosts/actions';
import setLike from '../../ducks/Like/actions';


import { __t } from './../../i18n/translator';

import './Profile.less';

const ACTIVE_TAB_VALUE = 'active';
const ARCHIVE_TAB_VALUE = 'archive';

@cn('Profile')
class ProfileLK extends Component {
  renderTabs(cn) {
    const { id } = this.props.me;
    const { params } = this.props;

    const activeTab = params.tab || '';

    const tabs = [
      {
        url: `/profile/${id}/lk`,
        title: __t('Items'),
        value: '',
        renderContent: () => <ShopPage {...this.props} />
      },
      {
        url: `/profile/${id}/lk/${ACTIVE_TAB_VALUE}`,
        title: __t('Active'),
        value: ACTIVE_TAB_VALUE,
        renderContent: () => <ActivePostsPage {...this.props} />
      },
      {
        url: `/profile/${id}/lk/${ARCHIVE_TAB_VALUE}`,
        title: __t('Archive'),
        value: ARCHIVE_TAB_VALUE,
        renderContent: () => <ArchivePage {...this.props} />
      }
    ];

    return (
      <Tabs
        activeTab={activeTab}
        className={cn('tabs')}
        tabs={tabs}
      />
    );
  }

  render(cn) {
    const { isFetchingPosts, itemsPosts, isMe } = this.props;

    const hasProductsForUnathorized = !isMe && !isFetchingPosts &&
      itemsPosts.length === 0;

    return (
      <div className={cn('content', { noPadding: hasProductsForUnathorized })}>
        {isMe ? this.renderTabs(cn) : this.getFirstTabContent()}

        {isMe && <ProfileBanners />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsPosts: state.ProfilePosts.items,
  next: state.ProfilePosts.next,
  isFetchingPosts: state.ProfilePosts.isFetching,
  me: state.Auth.me,
  user: state.Profile.data,
  isMe: state.Profile.isMe,
  isAuth: state.Auth.isAuthenticated,
  priceTemplate: state.Settings.data.CURRENCY,
});

export default connect(mapStateToProps, { ...actions, setLike })(ProfileLK);
