import React, { Component, PropTypes } from 'react';

import { DOMAIN_URL } from 'config';
import { __t } from './../../i18n/translator';

class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      avatarEditRotate: false,
    };
  }

  rotateImage = ({ target }) => {
    const { rotateImage } = this.props;

    rotateImage(target.dataset.name, target.dataset.direction);
  }

  upload = (e) => {
    const { uploadImage } = this.props;

    this.setState({
      isFetching: true,
    });

    uploadImage(e);
  }

  loaded = () => {
    this.setState({
      isFetching: false,
    });
  }

  removeImage = ({ currentTarget }) => {
    const { deleteImage } = this.props;

    deleteImage(currentTarget.dataset.name);
  }

  openDownloadDialog = () => {
    document.getElementById('avatar').click();
  }

  render() {
    const { avatar } = this.props;
    const avatarWrapperClass = avatar
      ? 'user-profile__avatar-wrap no-bg'
      : 'user-profile__avatar-wrap';

    return (
      <div className="user-profile__avatar-container">
        <form className="hidden user_photo" id="avatar_form" name="avatar_form">
          <input
            type="file"
            name="avatar"
            id="avatar"
            value=""
            onChange={this.upload}
          />
        </form>
        <div className={avatarWrapperClass}>
          {
            this.state.isFetching
            &&
            <div className="avatar-loader__wrapper">
              <div className="avatar-loader">
                <div className="loader03" />
              </div>
            </div>
          }
          {
            avatar
            &&
            <img
              className="user-profile__avatar"
              src={`${DOMAIN_URL}thumbs/unsafe/140x140/${avatar}`}
              onLoad={this.loaded}
            />
          }
          <div className="user-profile__avatar-overlay"></div>
          {
            avatar
              ? (<div
                className={`
                      user-profile__cover-menu
                      ${this.state.avatarEditRotate ? 'rotate' : ''}
                    `}
                onMouseLeave={() => this.setState({ avatarEditRotate: false })}
              >
                <div
                  className="cover-menu__item change-cover"
                  onClick={this.openDownloadDialog}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                    <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                  </svg>
                </div>
                <div
                  className="cover-menu__item move-cover"
                  onClick={() => { this.setState({ avatarEditRotate: true }); }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.969 27.969">
                    <path d="M11.442,10.17h5.085V6.356h3.813L13.984,0L7.628,6.356h3.814V10.17z M10.17,11.441H6.356V7.627L0,13.984 l6.356,6.356v-3.813h3.814V11.441z M27.969,13.984l-6.356-6.357v3.814h-3.813v5.086h3.813v3.813L27.969,13.984z M16.527,17.798 h-5.085v3.814H7.628l6.356,6.356l6.356-6.356h-3.813V17.798z" />
                  </svg>
                </div>
                <div
                  className="cover-menu__item rotate-cover rotate-cover-left"
                  onClick={this.rotateImage}
                  data-name="avatar"
                  data-direction="left"
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                    <path d="M0,81.575v136.438c0,19.883,16.232,36.015,36.293,36.015h135.624c20.062,0,36.293-16.132,36.293-36.015 s-16.231-36.015-36.293-36.015h-40.102c16.212-30.558,39.884-56.591,69.132-75.839c33.931-22.322,73.497-34.129,114.413-34.129 c55.381,0,107.448,21.39,146.617,60.262c39.17,38.872,60.739,90.543,60.739,145.507c0,54.944-21.569,106.634-60.739,145.486 c-39.169,38.871-91.236,60.282-146.617,60.282c-23.911,0-47.345-4.028-69.648-11.906c-21.55-7.64-41.59-18.711-59.567-32.938 c-35.955-28.515-61.651-68.478-72.347-112.588c-4.683-19.347-24.308-31.252-43.772-26.589c-19.506,4.643-31.49,24.068-26.808,43.415 c7.282,30.122,19.565,58.635,36.471,84.748c16.589,25.637,37.166,48.277,61.195,67.307c24.268,19.228,51.333,34.188,80.462,44.487 c30.141,10.695,61.79,16.093,94.034,16.093c37.78,0,74.45-7.362,108.977-21.848c33.335-13.988,63.278-34.029,88.954-59.527 c25.677-25.498,45.877-55.203,59.965-88.28c14.604-34.269,22.006-70.64,22.006-108.143c0-37.483-7.401-73.855-22.006-108.144 c-14.088-33.077-34.268-62.762-59.965-88.28c-25.696-25.518-55.619-45.539-88.954-59.527C389.811,7.362,353.16,0,315.38,0 c-55.241,0-108.678,15.954-154.534,46.135c-36.53,24.05-66.632,55.956-88.24,93.3v-57.86c0-19.883-16.251-36.015-36.293-36.015 C16.271,45.56,0.001,61.691,0,81.575z" />
                  </svg>
                </div>
                <div
                  className="cover-menu__item rotate-cover"
                  onClick={this.rotateImage}
                  data-name="avatar"
                  data-direction="right"
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                    <path d="M558.969,45.56c-20.042,0-36.293,16.132-36.293,36.015v57.86c-21.608-37.344-51.71-69.25-88.24-93.3 C388.579,15.954,335.143,0,279.901,0c-37.78,0-74.431,7.362-108.977,21.848c-33.335,13.988-63.258,34.01-88.954,59.527 c-25.697,25.519-45.877,55.203-59.965,88.28C7.401,203.943,0,240.315,0,277.799c0,37.503,7.401,73.874,22.006,108.143 c14.088,33.077,34.288,62.782,59.965,88.28c25.676,25.498,55.619,45.539,88.954,59.527c34.526,14.485,71.196,21.848,108.977,21.848 c32.244,0,63.894-5.397,94.034-16.093c29.129-10.299,56.194-25.26,80.462-44.487c24.029-19.029,44.606-41.67,61.195-67.307 c16.905-26.113,29.188-54.626,36.471-84.748c4.683-19.347-7.302-38.772-26.808-43.415c-19.465-4.663-39.09,7.242-43.772,26.589 c-10.695,44.11-36.392,84.073-72.347,112.588c-17.978,14.228-38.018,25.299-59.567,32.938 c-22.304,7.878-45.737,11.906-69.648,11.906c-55.381,0-107.448-21.411-146.617-60.282c-39.17-38.853-60.739-90.542-60.739-145.486 c0-54.964,21.569-106.635,60.739-145.507c39.169-38.872,91.236-60.262,146.617-60.262c40.916,0,80.482,11.807,114.413,34.129 c29.248,19.248,52.92,45.281,69.132,75.839h-40.102c-20.062,0-36.293,16.132-36.293,36.015s16.231,36.015,36.293,36.015h135.624 c20.061,0,36.293-16.132,36.293-36.015V81.575C595.28,61.691,579.01,45.56,558.969,45.56z" />
                  </svg>
                </div>
                <div
                  className="cover-menu__item delete-cover"
                  onClick={this.removeImage}
                  data-name="avatar"
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                    <path d="M14,0C6.258,0,0,6.257,0,14c0,7.743,6.258,14,14,14c7.74,0,14-6.258,14-14C28,6.257,21.74,0,14,0z M21,19.025 L19.025,21L14,15.975L8.974,21L7,19.025L12.026,14L7,8.974L8.974,7L14,12.025L19.025,7L21,8.974L15.975,14L21,19.025z" />
                  </svg>
                </div>
              </div>)
              : (<div className={'user-profile__cover-menu'}>
                <div
                  className="cover-menu__item change-cover"
                  onClick={this.openDownloadDialog}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                    <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                  </svg>
                  {__t('Load background')}
                </div>
              </div>)
          }

        </div>
      </div>
    );
  }
}

export default Avatar;
