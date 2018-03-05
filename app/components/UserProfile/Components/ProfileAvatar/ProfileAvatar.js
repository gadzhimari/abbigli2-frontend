import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Spin } from '../../../../components';

import { THUMBS_URL } from '../../../../config';
import { gaSendClickEvent } from '../../../../lib/analitics';
import { __t } from '../../../../i18n/translator';

import './ProfileAvatar.less';

const UPLOAD_INPUT_NAME = 'avatar';

class ProfileAvatar extends PureComponent {
  state = {
    isOpenDropdown: false,
  }

  handleEditing = () => {
    gaSendClickEvent('profile', 'edit');
    this.props.handleEditing(true);
  }

  handleChangeImage = () => {
    const { src } = this.props;

    if (src) {
      this.toggleDropdown();
    } else {
      this.focusOnFileInput();
    }
  }

  handleUploadImage = (e) => {
    this.props.uploadImage(e);
    this.setState({
      isOpenDropdown: false,
    });
  }

  handleDeleteImage = () => {
    this.props.deleteImage(UPLOAD_INPUT_NAME);
  }

  focusOnFileInput = () => {
    this.fileInput.click();
  }

  toggleDropdown = () => {
    this.setState({
      isOpenDropdown: !this.state.isOpenDropdown,
    });
  }

  render() {
    const { src, alt, isEditing, uploadingImage } = this.props;
    const isFetching = uploadingImage === UPLOAD_INPUT_NAME;

    return (
      <div className="profile-avatar">
        <input
          type="file"
          name={UPLOAD_INPUT_NAME}
          onChange={this.handleUploadImage}
          style={{ display: 'none' }}
          ref={(file) => { this.fileInput = file; }}
        />
        <div className="profile-avatar__wrap">
          <img
            className="profile-avatar__img"
            src={
              src
                ? `${THUMBS_URL}/unsafe/180x180/${src}`
                : '/images/svg/avatar.svg'
            }
            alt={alt}
          />
          {
            (isEditing && !isFetching)
            &&
            <div
              className="profile-avatar__edit"
              onClick={this.handleChangeImage}
            >
              <svg className="icon icon-camera" viewBox="0 0 30 27">
                <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
              </svg>
              {__t('Change photo')}
            </div>
          }
          {
            (isFetching && isEditing)
            &&
            <div className="profile-avatar__loader-wrapper">
              <div className="profile-avatar__loader">
                <div className="spin-wrapper">
                  <Spin visible={isFetching} />
                </div>
              </div>
            </div>
          }
        </div>
        {this.renderDropdown()}

        {this.renderButton()}
      </div>
    );
  }

  renderDropdown = () => {
    if (this.props.isEditing && this.state.isOpenDropdown) {
      return (
        <div className="profile-avatar__dropdown">
          <div
            className="profile-avatar__dropdown-item"
            onClick={this.focusOnFileInput}
          >
            {__t('Upload new')}
          </div>
          <div
            className="profile-avatar__dropdown-item"
            onClick={this.handleDeleteImage}
          >
            {__t('Delete')}
          </div>
          <div
            className="profile-avatar__dropdown-item"
            onClick={this.toggleDropdown}
          >
            {__t('Cancel')}
          </div>
        </div>
      );
    }
  }

  renderButton = () => {
    if (this.props.isMe) {
      return (
        <a className="profile-edit" onClick={this.handleEditing}>
          {__t('Edit')}
        </a>
      );
    }

    return (
      <a className="profile-edit" onClick={this.props.openMessagePopup}>
        {__t('Send message')}
      </a>
    );
  }
}

ProfileAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  uploadingImage: PropTypes.string,
  isMe: PropTypes.bool,
  isEditing: PropTypes.bool,
  openMessagePopup: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

ProfileAvatar.defaultProps = {
  alt: __t('Avatar'),
  src: '',
  isMe: false,
  isEditing: false,
  uploadingImage: null,
};

export default ProfileAvatar;
