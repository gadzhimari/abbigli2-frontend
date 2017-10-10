import React, { PureComponent } from 'react';

import ProfileHeader from './Components/ProfileHeader';
import ProfileInfo from './Components/ProfileInfo';

import { __t } from './../../i18n/translator';

import './UserProfile.less';

class UserProfile extends PureComponent {
  openFollowers = () => {
    this.openPopup(this.props.followers, __t('Followers'));
  }

  openFollowing = () => {
    this.openPopup(this.props.following, __t('Following'));
  }

  openPopup = (items, title) => {
    this.props.openPopup('followersPopup', {
      title,
      items,
      blankText: __t('No results'),
    });
  }

  openMessagePopup = () => {
    const { openPopup, data } = this.props;

    openPopup('messagePopup', data);
  }

  render() {
    return (
      <div className="profile">
        <ProfileHeader
          background={this.props.data.banner_main}
          isEditing={this.props.isEditing}
          uploadImage={this.props.uploadImage}
          uploadingImage={this.props.uploadingImage}
        />
        <ProfileInfo
          {...this.props}
          openFollowers={this.openFollowers}
          openMessagePopup={this.openMessagePopup}
          openFollowing={this.openFollowing}
        />
      </div >
    );
  }
}

export default UserProfile;
