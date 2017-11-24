import React, { PureComponent } from 'react';

import ProfileHeader from './Components/ProfileHeader';
import ProfileInfo from './Components/ProfileInfo';

import { __t } from './../../i18n/translator';

import './UserProfile.less';

class UserProfile extends PureComponent {
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
          openMessagePopup={this.openMessagePopup}
        />
      </div >
    );
  }
}

export default UserProfile;
