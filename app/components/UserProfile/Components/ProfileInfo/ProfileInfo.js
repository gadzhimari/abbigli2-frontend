import { React, Component } from '../../../../components-lib/__base';
import { ReadMore } from '../../../../components-lib';

import ProfileAvatar from '../ProfileAvatar';
import ProfileLinks from '../ProfileLinks';
import ProfileField from '../ProfileField';
import ProfileForm from '../ProfileForm';

import { __t } from '../../../../i18n/translator';

import './ProfileInfo.less';

class ProfileInfo extends Component {
  render() {
    const {
      data,
      isMe,
      openMessagePopup,
      follow,
      openPopup,
      isAuthenticated,
      handleEditing,
      isEditing,
      uploadImage,
      uploadingImage,
      saveChanges,
      deleteImage,
    } = this.props;

    return (
      <div className="profile-info">
        <div className="profile-info__inner">
          <ProfileAvatar
            src={data.avatar}
            alt={data.profile_name}
            isMe={isMe}
            openMessagePopup={openMessagePopup}
            handleEditing={handleEditing}
            isEditing={isEditing}
            uploadImage={uploadImage}
            uploadingImage={uploadingImage}
            deleteImage={deleteImage}
          />
          {
            isEditing
              ? <ProfileForm
                data={data}
                handleEditing={handleEditing}
                saveChanges={saveChanges}
                openPopup={openPopup}
              />
              : <div>
                <ProfileField
                  className="profile__name"
                  value={data.profile_name}
                  placeholder={__t('Profile name')}
                >
                  {data.profile_name}
                </ProfileField>
                <ProfileField
                  className="profile__about"
                  value={data.info}
                  placeholder={__t('Profile description')}
                >
                  <ReadMore lines={4}>
                    <p>
                      {data.info}
                    </p>
                  </ReadMore>
                </ProfileField>
                <ProfileField
                  className="profile__address"
                  value={data.city && `${data.city.name}, ${data.city.country.name}`}
                >
                  {
                    data.city
                    &&
                    <svg className="icon icon-pin" viewBox="40.3 168.9 14 20">
                      <path d="M52.2,170.9c-1.3-1.3-3.1-2.1-5-2.1c-1.9,0-3.6,0.7-5,2.1c-2.4,2.4-2.8,7.1-0.7,9.8l5.6,8.1l5.6-8.1 C55,178,54.7,173.4,52.2,170.9z M47.3,178.4c-1.4,0-2.6-1.1-2.6-2.6s1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6S48.7,178.4,47.3,178.4z" />
                    </svg>
                  }
                  {
                    data.city
                    &&
                    `${data.city.name}, ${data.city.country.name}`
                  }
                </ProfileField>
              </div>
          }
          <ProfileLinks
            isMe={isMe}
            data={data}
            follow={follow}
            openPopup={openPopup}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    );
  }
}

export default ProfileInfo;
