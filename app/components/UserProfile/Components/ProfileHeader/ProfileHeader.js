import React from 'react';
import PropTypes from 'prop-types';

import { pure, compose } from 'recompose';

import { THUMBS_URL } from 'config';

import { __t } from '../../../../i18n/translator';

import './ProfileHeader.less';

const UPLOAD_INPUT_NAME = 'banner_main';

const ProfileHeader = ({ background, isEditing, uploadImage, uploadingImage }) => {
  const headerStyle = background
    ? { backgroundImage: `url(${THUMBS_URL}/unsafe/1600x500/${background})` }
    : {};

  const isFetching = uploadingImage === UPLOAD_INPUT_NAME;

  return (
    <div
      className="profile-header"
      style={headerStyle}
    >
      <If condition={isEditing && !isFetching}>
        <div className="profile-header__edit">
          <input
            className="input-file"
            type="file"
            name={UPLOAD_INPUT_NAME}
            onChange={uploadImage}
          />
          <svg className="icon icon-camera" viewBox="0 0 30 27">
            <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
          </svg>
          {__t('Change header image')}
        </div>
      </If>
      <If condition={isEditing && isFetching}>
        <div className="profile-header__edit">
          {__t('Please wait, image loading...')}
        </div>
      </If>
    </div >
  );
};

ProfileHeader.propTypes = {
  background: PropTypes.string,
  uploadingImage: PropTypes.string,
  isEditing: PropTypes.bool,
  uploadImage: PropTypes.func,
};

ProfileHeader.defaultProps = {
  background: null,
  isEditing: false,
  uploadImage: () => { },
  uploadingImage: null,
};

const enhance = compose(pure);

export default enhance(ProfileHeader);
