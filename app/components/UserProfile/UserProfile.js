import React, { PureComponent } from 'react';

import ProfileHeader from './Components/ProfileHeader';
import ProfileInfo from './Components/ProfileInfo';

import { setFollow } from 'actions/follow';


import { API_URL } from 'config';
import { getJsonFromStorage } from 'utils/functions';
import { setMe } from 'ducks/Auth/authActions/fetchMe';

import { __t } from './../../i18n/translator';

import './UserProfile.less';

class UserProfile extends PureComponent {
  openFollowers = ({ target }) => {
    const { openPopup } = this.props;

    openPopup('followersPopup', {
      title: target.getAttribute('data-title'),
      items: this.props[target.getAttribute('data-type')],
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
        />
      </div >
    );
  }
}

export default UserProfile;
