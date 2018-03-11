import React, { PureComponent } from 'react';

import ProfileHeader from './Components/ProfileHeader';
import ProfileInfo from './Components/ProfileInfo';

import './UserProfile.less';

class UserProfile extends PureComponent {

  openMessagePopup = () => {
    this.props.onlyAuthPopup('messagePopup', this.props.data);
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
