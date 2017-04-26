import React, { PropTypes, Component } from 'react';
import './UserProfile.styl';
import { API_URL } from 'config';

import { setErrors, setProfile, updateBanner } from 'ducks/Profile';
import { setMe } from 'ducks/Auth';

import { __t } from './../../i18n/translator';
import { getJsonFromStorage } from 'utils/functions';

import { Link, SelectInput } from 'components';

class UserProfileMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      sideImageEdit: false,
      sideImageEditRotate: false,
      avatarEditRotate: false,
      coverImageEdit: false,
      coverImageEditRotate: false,
      showMoreText: false,
      cityValue: null,
      fbAcc: this.props.data.fb_account,
      pinterestAcc: this.props.data.pinterest_account,
      googleAcc: this.props.data.google_account,
      website: this.props.data.website_info,
      phone: this.props.data.email_info,
      email: this.props.data.phone_info,
    };
  }

  changeCityValue = (value) => {
    this.setState({
      cityValue: value,
    });
  }

  changeSociety = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  hideEdit = () => {
    const { dispatch, data } = this.props;
    this.setState({
      edit: false,
      fbAcc: data.fb_account,
      pinterestAcc: data.pinterest_account,
      googleAcc: data.google_account,
      website: data.website_info,
      phone: data.email_info,
      email: data.phone_info,
    });
    dispatch(setErrors(null));
  }

  upload = (e) => {
    const token = getJsonFromStorage('id_token');
    const { dispatch } = this.props;

    const formData = new FormData();
    formData.append(e.target.name, e.target.files[0]);
    const headers = {
      'Accept': 'application/json, */*',
      'Authorization': `JWT ${token}`,
    };
    const init = {
      headers,
      method: 'PATCH',
      body: formData,
    };
    fetch(`${API_URL}my-profile/`, init)
      .then(res => res.json())
      .then((responseData) => {
        dispatch(setProfile(responseData));
        dispatch(setMe(responseData));
      })
      .catch(err => console.log("Error: ", err));
  }

  removeImage = name => {
    const token = getJsonFromStorage('id_token');
    const { dispatch } = this.props;

    const formData = new FormData();
    const emptyBlob = new Blob();

    formData.append(name, emptyBlob, '');

    const headers = {
      'Accept': 'application/json, */*',
      'Authorization': `JWT ${token}`,
    };
    const config = {
      headers,
      method: 'PATCH',
      body: formData,
    };
    fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then((responseData) => {
        dispatch(setProfile(responseData));
      })
      .catch(err => console.log("Error: ", err));
  }

  saveData = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const city = this.state.cityValue
        ? this.state.cityValue.id
        : '';

    const payload = {
      profile_name: e.target.profile_name.value,
      info: e.target.info.value,
      my_abbigli_name: '',
      email_info: this.state.email,
      website_info: this.state.website,
      phone_info: this.state.phone,
      city,
      fb_account: this.state.fbAcc,
      vk_account: '',
      ok_account: '',
      pinterest_account: this.state.pinterestAcc,
      google_account: this.state.googleAcc,
    };

    const token = getJsonFromStorage('id_token');
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(payload),
    };

    fetch(`${API_URL}my-profile/`, config)
      .then(res => res.json())
      .then((response) => {
        if (response.id) {
          dispatch(setProfile(response));
          this.hideEdit();
        }

        dispatch(setErrors(response));
      });
  }

  rotateImage = (name, direction) => {
    const { dispatch } = this.props;
    const token = getJsonFromStorage('id_token');
    const formData = new FormData();

    formData.append('type', name);
    formData.append('direction', direction);

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        Authorization: `JWT ${token}`,
      },
      body: formData,
    };

    fetch(`${API_URL}my-profile/rotate-image/`, config)
      .then(res => res.json())
      .then((responseData) => {
        dispatch(updateBanner(responseData));
      })
      .catch(err => console.log("Error: ", err));
  }

  render() {
    const {
      profile_name,
      avatar,
      info,
      phone_info,
      email_info,
      city,
      banner_main,
      banner_left,
      likes_num,
      followers_count,
    } = this.props.data;

    const { googleAcc, pinterestAcc, fbAcc, website, phone, email } = this.state;

    const user = this.props.data;

    const { errors } = this.props;
    return (
      <div className={"user-profile__info " + (this.state.edit ? "edit-profile" : "")}>

        <form className="hidden user_photo" id="banner_left_form" name="avatar_form">
          <input
            type="file"
            name="banner_left"
            id="banner_left"
            value=""
            onChange={this.upload}
          />
        </form>
        <form className="hidden user_photo" id="banner_main_form" name="avatar_form">
          <input
            type="file"
            name="banner_main"
            id="banner_main"
            value=""
            onChange={this.upload}
          />
        </form>
        <form className="hidden user_photo" id="avatar_form" name="avatar_form">
          <input
            type="file"
            name="avatar"
            id="avatar"
            value=""
            onChange={this.upload}
          />
        </form>

        <div className="user-profile__cover-small">
          <div className="user-profile__avatar-container">
            <div className="user-profile__avatar-wrap">
              {
                avatar
                &&
                <img
                  className="user-profile__avatar"
                  src={`https://abbigli.com/thumbs/unsafe/140x140/${avatar}`}
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
                      onClick={() => { document.getElementById('avatar').click(); }}
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
                      onClick={() => this.rotateImage('avatar', 'left')}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                        <path d="M0,81.575v136.438c0,19.883,16.232,36.015,36.293,36.015h135.624c20.062,0,36.293-16.132,36.293-36.015 s-16.231-36.015-36.293-36.015h-40.102c16.212-30.558,39.884-56.591,69.132-75.839c33.931-22.322,73.497-34.129,114.413-34.129 c55.381,0,107.448,21.39,146.617,60.262c39.17,38.872,60.739,90.543,60.739,145.507c0,54.944-21.569,106.634-60.739,145.486 c-39.169,38.871-91.236,60.282-146.617,60.282c-23.911,0-47.345-4.028-69.648-11.906c-21.55-7.64-41.59-18.711-59.567-32.938 c-35.955-28.515-61.651-68.478-72.347-112.588c-4.683-19.347-24.308-31.252-43.772-26.589c-19.506,4.643-31.49,24.068-26.808,43.415 c7.282,30.122,19.565,58.635,36.471,84.748c16.589,25.637,37.166,48.277,61.195,67.307c24.268,19.228,51.333,34.188,80.462,44.487 c30.141,10.695,61.79,16.093,94.034,16.093c37.78,0,74.45-7.362,108.977-21.848c33.335-13.988,63.278-34.029,88.954-59.527 c25.677-25.498,45.877-55.203,59.965-88.28c14.604-34.269,22.006-70.64,22.006-108.143c0-37.483-7.401-73.855-22.006-108.144 c-14.088-33.077-34.268-62.762-59.965-88.28c-25.696-25.518-55.619-45.539-88.954-59.527C389.811,7.362,353.16,0,315.38,0 c-55.241,0-108.678,15.954-154.534,46.135c-36.53,24.05-66.632,55.956-88.24,93.3v-57.86c0-19.883-16.251-36.015-36.293-36.015 C16.271,45.56,0.001,61.691,0,81.575z" />
                      </svg>
                    </div>
                    <div
                      className="cover-menu__item rotate-cover"
                      onClick={() => this.rotateImage('avatar', 'right')}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                        <path d="M558.969,45.56c-20.042,0-36.293,16.132-36.293,36.015v57.86c-21.608-37.344-51.71-69.25-88.24-93.3 C388.579,15.954,335.143,0,279.901,0c-37.78,0-74.431,7.362-108.977,21.848c-33.335,13.988-63.258,34.01-88.954,59.527 c-25.697,25.519-45.877,55.203-59.965,88.28C7.401,203.943,0,240.315,0,277.799c0,37.503,7.401,73.874,22.006,108.143 c14.088,33.077,34.288,62.782,59.965,88.28c25.676,25.498,55.619,45.539,88.954,59.527c34.526,14.485,71.196,21.848,108.977,21.848 c32.244,0,63.894-5.397,94.034-16.093c29.129-10.299,56.194-25.26,80.462-44.487c24.029-19.029,44.606-41.67,61.195-67.307 c16.905-26.113,29.188-54.626,36.471-84.748c4.683-19.347-7.302-38.772-26.808-43.415c-19.465-4.663-39.09,7.242-43.772,26.589 c-10.695,44.11-36.392,84.073-72.347,112.588c-17.978,14.228-38.018,25.299-59.567,32.938 c-22.304,7.878-45.737,11.906-69.648,11.906c-55.381,0-107.448-21.411-146.617-60.282c-39.17-38.853-60.739-90.542-60.739-145.486 c0-54.964,21.569-106.635,60.739-145.507c39.169-38.872,91.236-60.262,146.617-60.262c40.916,0,80.482,11.807,114.413,34.129 c29.248,19.248,52.92,45.281,69.132,75.839h-40.102c-20.062,0-36.293,16.132-36.293,36.015s16.231,36.015,36.293,36.015h135.624 c20.061,0,36.293-16.132,36.293-36.015V81.575C595.28,61.691,579.01,45.56,558.969,45.56z"/>
                      </svg>
                    </div>
                    <div
                      className="cover-menu__item delete-cover"
                      onClick={() => this.removeImage('avatar')}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                        <path d="M14,0C6.258,0,0,6.257,0,14c0,7.743,6.258,14,14,14c7.74,0,14-6.258,14-14C28,6.257,21.74,0,14,0z M21,19.025 L19.025,21L14,15.975L8.974,21L7,19.025L12.026,14L7,8.974L8.974,7L14,12.025L19.025,7L21,8.974L15.975,14L21,19.025z"/>
                      </svg>
                    </div>
                  </div>)
                  : (<div className={'user-profile__cover-menu'}>
                    <div
                      className="cover-menu__item change-cover"
                      onClick={() => { document.getElementById('avatar').click(); }}
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
            {
              banner_left
                ? <img className="user-profile__cover" src={`${banner_left}`} />
                : <img className="user-profile__cover" src="/images/def_left.jpg" />
            }
            {
              !banner_left
              &&
              <div className="user-profile__cover-text">
                {__t('cta.add.bg')}
              </div>
            }

            {
              banner_left
                ? (<div
                  className={`
                  user-profile__cover-menu
                  ${this.state.sideImageEdit ? 'open' : ''}
                  ${this.state.sideImageEditRotate ? 'rotate' : ''}
                `}
                  onMouseOver={() => this.setState({ sideImageEdit: true })}
                  onMouseLeave={() => this.setState({ sideImageEdit: false, sideImageEditRotate: false })}
                >
                  <div
                    className="cover-menu__item change-cover"
                    onClick={() => { document.getElementById('banner_left').click(); }}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                      <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                    </svg>
                    {__t('Change.the.background')}
                  </div>
                  <div
                    className="cover-menu__item move-cover"
                    onClick={() => { this.setState({ sideImageEditRotate: true }); }}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.969 27.969">
                        <path d="M11.442,10.17h5.085V6.356h3.813L13.984,0L7.628,6.356h3.814V10.17z M10.17,11.441H6.356V7.627L0,13.984 l6.356,6.356v-3.813h3.814V11.441z M27.969,13.984l-6.356-6.357v3.814h-3.813v5.086h3.813v3.813L27.969,13.984z M16.527,17.798 h-5.085v3.814H7.628l6.356,6.356l6.356-6.356h-3.813V17.798z" />
                      </svg>
                    {__t('Move.cover')}
                  </div>
                  <div
                    className="cover-menu__item rotate-cover rotate-cover-left"
                    onClick={() => this.rotateImage('banner_left', 'left')}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                        <path d="M0,81.575v136.438c0,19.883,16.232,36.015,36.293,36.015h135.624c20.062,0,36.293-16.132,36.293-36.015 s-16.231-36.015-36.293-36.015h-40.102c16.212-30.558,39.884-56.591,69.132-75.839c33.931-22.322,73.497-34.129,114.413-34.129 c55.381,0,107.448,21.39,146.617,60.262c39.17,38.872,60.739,90.543,60.739,145.507c0,54.944-21.569,106.634-60.739,145.486 c-39.169,38.871-91.236,60.282-146.617,60.282c-23.911,0-47.345-4.028-69.648-11.906c-21.55-7.64-41.59-18.711-59.567-32.938 c-35.955-28.515-61.651-68.478-72.347-112.588c-4.683-19.347-24.308-31.252-43.772-26.589c-19.506,4.643-31.49,24.068-26.808,43.415 c7.282,30.122,19.565,58.635,36.471,84.748c16.589,25.637,37.166,48.277,61.195,67.307c24.268,19.228,51.333,34.188,80.462,44.487 c30.141,10.695,61.79,16.093,94.034,16.093c37.78,0,74.45-7.362,108.977-21.848c33.335-13.988,63.278-34.029,88.954-59.527 c25.677-25.498,45.877-55.203,59.965-88.28c14.604-34.269,22.006-70.64,22.006-108.143c0-37.483-7.401-73.855-22.006-108.144 c-14.088-33.077-34.268-62.762-59.965-88.28c-25.696-25.518-55.619-45.539-88.954-59.527C389.811,7.362,353.16,0,315.38,0 c-55.241,0-108.678,15.954-154.534,46.135c-36.53,24.05-66.632,55.956-88.24,93.3v-57.86c0-19.883-16.251-36.015-36.293-36.015 C16.271,45.56,0.001,61.691,0,81.575z" />
                      </svg>
                    {__t('Rotate.cover')}
                  </div>
                  <div
                    className="cover-menu__item rotate-cover"
                    onClick={() => this.rotateImage('banner_left', 'right')}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                        <path d="M558.969,45.56c-20.042,0-36.293,16.132-36.293,36.015v57.86c-21.608-37.344-51.71-69.25-88.24-93.3 C388.579,15.954,335.143,0,279.901,0c-37.78,0-74.431,7.362-108.977,21.848c-33.335,13.988-63.258,34.01-88.954,59.527 c-25.697,25.519-45.877,55.203-59.965,88.28C7.401,203.943,0,240.315,0,277.799c0,37.503,7.401,73.874,22.006,108.143 c14.088,33.077,34.288,62.782,59.965,88.28c25.676,25.498,55.619,45.539,88.954,59.527c34.526,14.485,71.196,21.848,108.977,21.848 c32.244,0,63.894-5.397,94.034-16.093c29.129-10.299,56.194-25.26,80.462-44.487c24.029-19.029,44.606-41.67,61.195-67.307 c16.905-26.113,29.188-54.626,36.471-84.748c4.683-19.347-7.302-38.772-26.808-43.415c-19.465-4.663-39.09,7.242-43.772,26.589 c-10.695,44.11-36.392,84.073-72.347,112.588c-17.978,14.228-38.018,25.299-59.567,32.938 c-22.304,7.878-45.737,11.906-69.648,11.906c-55.381,0-107.448-21.411-146.617-60.282c-39.17-38.853-60.739-90.542-60.739-145.486 c0-54.964,21.569-106.635,60.739-145.507c39.169-38.872,91.236-60.262,146.617-60.262c40.916,0,80.482,11.807,114.413,34.129 c29.248,19.248,52.92,45.281,69.132,75.839h-40.102c-20.062,0-36.293,16.132-36.293,36.015s16.231,36.015,36.293,36.015h135.624 c20.061,0,36.293-16.132,36.293-36.015V81.575C595.28,61.691,579.01,45.56,558.969,45.56z"/>
                      </svg>
                    {__t('Rotate.cover')}
                  </div>
                  <div
                    className="cover-menu__item delete-cover"
                    onClick={() => this.removeImage('banner_left')}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                      <path d="M14,0C6.258,0,0,6.257,0,14c0,7.743,6.258,14,14,14c7.74,0,14-6.258,14-14C28,6.257,21.74,0,14,0z M21,19.025 L19.025,21L14,15.975L8.974,21L7,19.025L12.026,14L7,8.974L8.974,7L14,12.025L19.025,7L21,8.974L15.975,14L21,19.025z"/>
                    </svg>
                    {__t('Delete.cover')}
                  </div>
                </div>)
                : (<div className={'user-profile__cover-menu'}>
                  <div
                    className="cover-menu__item change-cover"
                    onClick={() => { document.getElementById('banner_left').click(); }}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                        <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                      </svg>
                    {__t('Load background')}
                  </div>
                </div>)
            }


          </div>

          <form
            className="user-profile__cover-big"
            onSubmit={this.saveData}
            style={banner_main ? { backgroundImage: `url(${banner_main})`, backgroundSize: 'cover' } : null}
          >
            <div className="user-profile__form">
              <div className="user-profile__title-wrap">
                <input
                  className="user-profile__title"
                  type="text"
                  placeholder={__t('enter.title')}
                  name="profile_name"
                  defaultValue={profile_name}
                  disabled={!this.state.edit}
                />
              </div>
              <div className={"user-profile__description-wrap userProfileDesc" + (this.state.showMoreText ? " showMoreText" : "")}>
                <div className="description-corner-wrap">
                  <div className="description-corner" />
                </div>
                <textarea
                  defaultValue={info}
                  className="user-profile__description"
                  placeholder={__t('add.info.about.your.page')}
                  name="info"
                  disabled={!this.state.edit}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 6"
                  className="user-profile__description-more moreText"
                  onClick={() => (this.setState({ showMoreText: !this.state.showMoreText }))}
                >
	                <path d="M3,0C1.344,0,0,1.343,0,3c0,1.656,1.344,3,3,3s3-1.344,3-3C6,1.343,4.656,0,3,0z M14,0c-1.657,0-3,1.343-3,3 c0,1.656,1.343,3,3,3c1.656,0,3-1.344,3-3C17,1.343,15.656,0,14,0z M25,0c-1.656,0-3,1.343-3,3c0,1.656,1.344,3,3,3s3-1.344,3-3 C28,1.343,26.656,0,25,0z"/>
                </svg>
              </div>
              {
                (this.state.edit || phone)
                &&
                <div className="input-profile-wrap input-phone">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.399 14.399">
<path d="M2.896,6.232c1.152,2.264,3.008,4.112,5.272,5.272l1.761-1.761c0.215-0.215,0.535-0.287,0.815-0.191
	c0.896,0.297,1.864,0.456,2.856,0.456c0.439,0,0.799,0.36,0.799,0.8V13.6c0,0.44-0.359,0.8-0.799,0.8C6.088,14.399,0,8.313,0,0.8
	C0,0.36,0.36,0,0.8,0h2.8c0.44,0,0.8,0.36,0.8,0.8c0,1,0.16,1.959,0.456,2.855c0.088,0.28,0.024,0.592-0.2,0.816L2.896,6.232z"/>
</svg>
                  <input
                    className="input-profile"
                    type="text"
                    placeholder={__t('Phone')}
                    name="phone"
                    value={phone}
                    disabled={!this.state.edit}
                    onChange={this.changeSociety}
                  />
                </div>
              }
              {
                (this.state.edit || email)
                &&
                <div className="input-profile-wrap input-email">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15.961">
<path d="M9.631,10.262H9.582c-0.465,1.392-1.378,2.088-2.737,2.088c-0.867,0-1.566-0.326-2.097-0.977
	S3.952,9.848,3.952,8.748c0-1.457,0.364-2.667,1.092-3.632C5.772,4.151,6.731,3.67,7.922,3.67c0.453,0,0.857,0.125,1.213,0.373
	c0.356,0.25,0.586,0.549,0.689,0.899h0.029C9.874,4.761,9.922,4.388,10,3.825h1.611c-0.304,3.417-0.456,5.159-0.456,5.224
	c0,1.281,0.333,1.922,1,1.922c0.608,0,1.113-0.357,1.515-1.072c0.401-0.716,0.602-1.643,0.602-2.782
	c0-1.683-0.541-3.057-1.626-4.121c-1.084-1.064-2.587-1.598-4.51-1.598c-1.845,0-3.372,0.645-4.583,1.933
	c-1.21,1.288-1.815,2.899-1.815,4.835c0,1.909,0.583,3.449,1.748,4.621s2.735,1.757,4.709,1.757c1.554,0,2.884-0.266,3.99-0.795
	v1.494c-1.133,0.479-2.547,0.719-4.243,0.719c-2.382,0-4.301-0.712-5.757-2.136C0.728,12.401,0,10.537,0,8.232
	C0,5.864,0.77,3.899,2.311,2.34C3.851,0.78,5.819,0,8.213,0c2.246,0,4.105,0.653,5.578,1.961S16,4.974,16,7.078
	c0,1.541-0.4,2.804-1.199,3.791c-0.799,0.987-1.775,1.481-2.927,1.481C10.385,12.35,9.638,11.653,9.631,10.262z M8.087,5.048
	c-0.712,0-1.287,0.35-1.723,1.048c-0.437,0.699-0.655,1.57-0.655,2.611c0,0.699,0.147,1.251,0.441,1.655
	c0.294,0.405,0.688,0.607,1.18,0.607c0.712,0,1.275-0.367,1.689-1.102c0.414-0.735,0.621-1.708,0.621-2.918
	C9.641,5.683,9.123,5.048,8.087,5.048z"/>
</svg>
                  <input
                    className="input-profile"
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    disabled={!this.state.edit}
                    onChange={this.changeSociety}
                  />
                </div>
              }
              {
                (this.state.edit || website)
                &&
                <div className="input-profile-wrap input-site">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
<path d="M8,0C3.584,0,0,3.584,0,8s3.584,8,8,8s8-3.584,8-8S12.416,0,8,0z M7.2,14.344C4.04,13.951,1.6,11.264,1.6,8
	c0-0.496,0.064-0.968,0.168-1.432L5.6,10.399V11.2c0,0.879,0.72,1.6,1.6,1.6V14.344z M12.721,12.313
	C12.512,11.664,11.92,11.2,11.2,11.2h-0.8V8.8C10.4,8.36,10.04,8,9.6,8H4.8V6.4h1.6c0.44,0,0.8-0.36,0.8-0.8V4h1.6
	C9.68,4,10.4,3.28,10.4,2.4V2.072c2.344,0.953,4,3.248,4,5.928C14.4,9.664,13.76,11.176,12.721,12.313z"/>
</svg>

                  <input
                    className="input-profile"
                    type="text"
                    placeholder={__t('Website')}
                    name="website"
                    value={website}
                    disabled={!this.state.edit}
                    onChange={this.changeSociety}
                  />
                </div>
              }
              {
                (this.state.edit || city)
                &&
                <div className="selectize-address">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg"	 viewBox="0 0 12.6 18">
<path d="M6.3,0C2.817,0,0,2.816,0,6.3C0,11.025,6.3,18,6.3,18s6.3-6.975,6.3-11.7C12.6,2.816,9.785,0,6.3,0z M6.3,8.55
	c-1.242,0-2.25-1.008-2.25-2.25S5.058,4.05,6.3,4.05c1.241,0,2.25,1.008,2.25,2.25S7.542,8.55,6.3,8.55z"/>
</svg>

                  <div className="selectize-control demo-default single">
                    {
                      this.state.edit
                        ? <SelectInput
                          placeholder={__t('Adress')}
                          apiPath={`${API_URL}geo/cities/`}
                          currentValue={city}
                          onSelectValue={this.changeCityValue}
                          ref={cityInput => (this.cityInput = cityInput)}
                          disabled={!this.state.edit}
                        />
                        : (<div className="selectize-input items not-full">
                            {city.name}
                            {', '}
                            {city.country.name}
                          </div>)
                    }
                  </div>
                </div>
              }
              <div className="user-profile__social-links">
                {
                  ((googleAcc && googleAcc.length > 0)
                    ||
                  (pinterestAcc && pinterestAcc.length > 0)
                    ||
                  (fbAcc && fbAcc.length > 0))
                    &&
                  !this.state.edit
                    &&
                  <div className="social-links-text">
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 8"
                    >
                      <path d="M1.52,4c0-1.368,1.112-2.48,2.48-2.48h3.2V0H4C1.792,0,0,1.792,0,4s1.792,4,4,4h3.2V6.479H4 C2.632,6.479,1.52,5.367,1.52,4z M4.8,4.8h6.4V3.2H4.8V4.8z M12,0H8.8v1.52H12c1.368,0,2.479,1.112,2.479,2.48 c0,1.367-1.111,2.479-2.479,2.479H8.8V8H12c2.207,0,4-1.792,4-4S14.207,0,12,0z"/>
                    </svg>
                  </div>
                }
                {
                  this.state.edit
                  &&
                  <div className="social-links-text">
                    <svg
                      className="icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 8"
                    >
                      <path d="M1.52,4c0-1.368,1.112-2.48,2.48-2.48h3.2V0H4C1.792,0,0,1.792,0,4s1.792,4,4,4h3.2V6.479H4 C2.632,6.479,1.52,5.367,1.52,4z M4.8,4.8h6.4V3.2H4.8V4.8z M12,0H8.8v1.52H12c1.368,0,2.479,1.112,2.479,2.48 c0,1.367-1.111,2.479-2.479,2.479H8.8V8H12c2.207,0,4-1.792,4-4S14.207,0,12,0z"/>
                    </svg>
                    {__t('add.social.links')}
                  </div>
                }
                {
                  (this.state.edit || (fbAcc && fbAcc.length > 1))
                  &&
                  <div className="input-profile-social">
                    <a className="social-network facebook" href={fbAcc}>
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
<path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
	c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"/>
</svg>
                    </a>
                    <input
                      className="input-profile"
                      type="text"
                      placeholder="http://www.facebook.com/profile"
                      name="fbAcc"
                      value={fbAcc}
                      disabled={!this.state.edit}
                      onChange={this.changeSociety}
                    />
                    {
                      (this.state.edit && errors && errors.fb_account)
                        &&
                      <div className="profile__edit-error">
                        {errors.fb_account}
                      </div>
                    }
                  </div>
                }
                {
                  (this.state.edit || (pinterestAcc && pinterestAcc.length > 1))
                  &&
                  <div className="input-profile-social">
                    <a className="social-network pinterest" href={pinterestAcc}>
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.912 15.975">
<path d="M2.34,9.239c0.802-1.365-0.258-1.664-0.425-2.654c-0.679-4.043,4.847-6.806,7.741-3.98
	c2.002,1.957,0.684,7.975-2.545,7.348C4.02,9.356,8.626,4.567,6.158,3.626c-2.006-0.765-3.071,2.337-2.12,3.878
	c-0.559,2.651-1.76,5.147-1.273,8.471c1.577-1.102,2.109-3.211,2.545-5.41c0.793,0.465,1.217,0.946,2.228,1.021
	c3.727,0.277,5.81-3.581,5.299-7.145c-0.452-3.157-3.722-4.764-7.21-4.388C2.869,0.352,0.12,2.498,0.006,5.565
	C-0.063,7.438,0.488,8.844,2.34,9.239z"/>
</svg>

                    </a>
                    <input
                      className="input-profile"
                      type="text"
                      placeholder="http://www.pinterest.com/profile"
                      name="pinterestAcc"
                      value={pinterestAcc}
                      disabled={!this.state.edit}
                      onChange={this.changeSociety}
                    />
                    {
                      (this.state.edit && errors && errors.pinterest_account)
                        &&
                      <div className="profile__edit-error">
                        {errors.pinterest_account}
                      </div>
                    }
                  </div>
                }
                {
                  (this.state.edit || (googleAcc && googleAcc.length > 1))
                    &&
                  <div className="input-profile-social">
                    <a className="social-network google-plus" href={googleAcc}>
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.146 14">
	<path d="M7.034,5.998c-0.002,0.795,0,1.591,0.003,2.386c1.343,0.042,2.685,0.022,4.026,0.042
		c-0.593,2.96-4.639,3.917-6.775,1.986c-2.2-1.693-2.096-5.411,0.19-6.984C6.08,2.157,8.351,2.471,9.952,3.572
		c0.626-0.579,1.215-1.197,1.78-1.839c-1.328-1.056-2.959-1.808-4.698-1.727C3.411-0.115,0.079,3.044,0.019,6.649
		c-0.231,2.947,1.718,5.839,4.469,6.882c2.741,1.049,6.253,0.335,8.001-2.116c1.157-1.547,1.406-3.539,1.27-5.411
		C11.516,5.988,9.277,5.991,7.034,5.998z M20.139,5.988c-0.004-0.666-0.007-1.333-0.014-1.999h-1.998
		c-0.005,0.665-0.014,1.329-0.016,1.999c-0.672,0.003-1.339,0.006-2.01,0.013v1.987c0.671,0.008,1.341,0.015,2.01,0.021
		c0.009,0.667,0.009,1.331,0.016,1.995h1.998c0.007-0.664,0.01-1.328,0.014-1.997C20.812,8,21.479,7.997,22.146,7.988V6.001
		C21.479,5.994,20.809,5.994,20.139,5.988z"/>
</svg>
                    </a>
                    <input
                      className="input-profile"
                      type="text"
                      placeholder="http://plus.google.com/profile"
                      name="googleAcc"
                      value={googleAcc}
                      disabled={!this.state.edit}
                      onChange={this.changeSociety}
                    />
                    {
                      (this.state.edit && errors && errors.google_account)
                        &&
                      <div className="profile__edit-error">
                        {errors.google_account}
                      </div>
                    }
                  </div>
                }

                {/*{ (this.state.edit || (ok_account && ok_account.length > 1 ) ) &&
                <div className="input-profile-social"><a className="social-network odnoklassniki" href={ok_account}>
                  <svg className="icon">
                    <use href="#odnoklassniki"></use>
                  </svg>
                </a> <input className="input-profile" type="text" placeholder="http://ok.ru/profile" value={ok_account}
                            name="ok_account" disabled={!this.state.edit}/></div>
                }
                { (this.state.edit || (vk_account && vk_account.length > 1 ) ) &&
                <div className="input-profile-social"><a className="social-network vkontakte" href={vk_account}>
                  <svg className="icon">
                    <use href="#vkontakte"></use>
                  </svg>
                </a> <input className="input-profile" type="text" placeholder="http://vk.com/profile" value={vk_account}
                            name="vk_account" disabled={!this.state.edit}/></div>
                }*/}
              </div>
            </div>
            <div className="user-profile__characteristic-wrap">
              <div className="user-profile__characteristic">
                <div
                  className="user-profile__characteristic-item followers"
                  onClick={this.props.showFollowers}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.4 27.199">
<path d="M23.8,13.6c3.759,0,6.801-3.043,6.801-6.8S27.559,0,23.8,0C20.042,0,17,3.043,17,6.8S20.042,13.6,23.8,13.6z
	 M8.5,10.2V5.1H5.1V10.2H0V13.6h5.1v5.1h3.4v-5.1h5.1V10.2H8.5z M23.8,17c-4.538,0-13.6,2.277-13.6,6.8v3.399h27.2V23.8
	C37.4,19.277,28.339,17,23.8,17z"/>
</svg>
                  {this.props.me.followers_count}
                </div>
                <div className="user-profile__characteristic-item likes">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31.193">
<path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552
	C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z"/>
</svg>
                  0
                </div>
                <div className="user-profile__characteristic-item messages">
                  <Link
                    to={`/profile/${user.id}/messages`}
                  >
                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
<path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2
	L5,4.5L1,2V1l4,2.5L9,1V2z"/>
</svg>
                    {this.props.data.unread_messages_num}
                  </Link>
                </div>
              </div>

              {
                banner_main
                  ? (<div
                    className={`
                user-profile__cover-menu
                ${this.state.coverImageEdit ? 'open' : ''}
                ${this.state.coverImageEditRotate ? 'rotate' : ''}
              `}
                    onMouseOver={() => this.setState({ coverImageEdit: true })}
                    onMouseLeave={() => this.setState({ coverImageEdit: false, coverImageEditRotate: false })}
                  >
                    <div
                      className="cover-menu__item change-cover"
                      onClick={() => { document.getElementById('banner_main').click(); }}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                        <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                      </svg>
                      {__t('Change.the.background')}
                    </div>
                    <div
                      className="cover-menu__item move-cover"
                      onClick={() => { this.setState({ coverImageEditRotate: true }) }}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.969 27.969">
                        <path d="M11.442,10.17h5.085V6.356h3.813L13.984,0L7.628,6.356h3.814V10.17z M10.17,11.441H6.356V7.627L0,13.984 l6.356,6.356v-3.813h3.814V11.441z M27.969,13.984l-6.356-6.357v3.814h-3.813v5.086h3.813v3.813L27.969,13.984z M16.527,17.798 h-5.085v3.814H7.628l6.356,6.356l6.356-6.356h-3.813V17.798z" />
                      </svg>
                      {__t('Move.cover')}
                    </div>
                    <div
                      className="cover-menu__item rotate-cover rotate-cover-left"
                      onClick={() => this.rotateImage('banner_main', 'left')}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                        <path d="M0,81.575v136.438c0,19.883,16.232,36.015,36.293,36.015h135.624c20.062,0,36.293-16.132,36.293-36.015 s-16.231-36.015-36.293-36.015h-40.102c16.212-30.558,39.884-56.591,69.132-75.839c33.931-22.322,73.497-34.129,114.413-34.129 c55.381,0,107.448,21.39,146.617,60.262c39.17,38.872,60.739,90.543,60.739,145.507c0,54.944-21.569,106.634-60.739,145.486 c-39.169,38.871-91.236,60.282-146.617,60.282c-23.911,0-47.345-4.028-69.648-11.906c-21.55-7.64-41.59-18.711-59.567-32.938 c-35.955-28.515-61.651-68.478-72.347-112.588c-4.683-19.347-24.308-31.252-43.772-26.589c-19.506,4.643-31.49,24.068-26.808,43.415 c7.282,30.122,19.565,58.635,36.471,84.748c16.589,25.637,37.166,48.277,61.195,67.307c24.268,19.228,51.333,34.188,80.462,44.487 c30.141,10.695,61.79,16.093,94.034,16.093c37.78,0,74.45-7.362,108.977-21.848c33.335-13.988,63.278-34.029,88.954-59.527 c25.677-25.498,45.877-55.203,59.965-88.28c14.604-34.269,22.006-70.64,22.006-108.143c0-37.483-7.401-73.855-22.006-108.144 c-14.088-33.077-34.268-62.762-59.965-88.28c-25.696-25.518-55.619-45.539-88.954-59.527C389.811,7.362,353.16,0,315.38,0 c-55.241,0-108.678,15.954-154.534,46.135c-36.53,24.05-66.632,55.956-88.24,93.3v-57.86c0-19.883-16.251-36.015-36.293-36.015 C16.271,45.56,0.001,61.691,0,81.575z" />
                      </svg>
                      {__t('Rotate.cover')}
                    </div>
                    <div
                      className="cover-menu__item rotate-cover"
                      onClick={() => this.rotateImage('banner_main', 'right')}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595.281 555.597">
                        <path d="M558.969,45.56c-20.042,0-36.293,16.132-36.293,36.015v57.86c-21.608-37.344-51.71-69.25-88.24-93.3 C388.579,15.954,335.143,0,279.901,0c-37.78,0-74.431,7.362-108.977,21.848c-33.335,13.988-63.258,34.01-88.954,59.527 c-25.697,25.519-45.877,55.203-59.965,88.28C7.401,203.943,0,240.315,0,277.799c0,37.503,7.401,73.874,22.006,108.143 c14.088,33.077,34.288,62.782,59.965,88.28c25.676,25.498,55.619,45.539,88.954,59.527c34.526,14.485,71.196,21.848,108.977,21.848 c32.244,0,63.894-5.397,94.034-16.093c29.129-10.299,56.194-25.26,80.462-44.487c24.029-19.029,44.606-41.67,61.195-67.307 c16.905-26.113,29.188-54.626,36.471-84.748c4.683-19.347-7.302-38.772-26.808-43.415c-19.465-4.663-39.09,7.242-43.772,26.589 c-10.695,44.11-36.392,84.073-72.347,112.588c-17.978,14.228-38.018,25.299-59.567,32.938 c-22.304,7.878-45.737,11.906-69.648,11.906c-55.381,0-107.448-21.411-146.617-60.282c-39.17-38.853-60.739-90.542-60.739-145.486 c0-54.964,21.569-106.635,60.739-145.507c39.169-38.872,91.236-60.262,146.617-60.262c40.916,0,80.482,11.807,114.413,34.129 c29.248,19.248,52.92,45.281,69.132,75.839h-40.102c-20.062,0-36.293,16.132-36.293,36.015s16.231,36.015,36.293,36.015h135.624 c20.061,0,36.293-16.132,36.293-36.015V81.575C595.28,61.691,579.01,45.56,558.969,45.56z"/>
                      </svg>

                      {__t('Rotate.cover')}
                    </div>
                    <div className="cover-menu__item delete-cover" onClick={() => this.removeImage('banner_main')}>
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                        <path d="M14,0C6.258,0,0,6.257,0,14c0,7.743,6.258,14,14,14c7.74,0,14-6.258,14-14C28,6.257,21.74,0,14,0z M21,19.025 L19.025,21L14,15.975L8.974,21L7,19.025L12.026,14L7,8.974L8.974,7L14,12.025L19.025,7L21,8.974L15.975,14L21,19.025z"/>
                      </svg>
                      {__t('Delete.cover')}
                    </div>
                  </div>)
                  : (<div className={'user-profile__cover-menu'}>
                    <div
                      className="cover-menu__item change-cover"
                      onClick={() => { document.getElementById('banner_main').click(); }}
                    >
                      <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 27">
                        <path d="M27,27H3c-1.651,0-3-1.351-3-2.997V6c0-1.65,1.349-3,3-3h4.756L10.5,0 h9.002l2.743,3H27c1.649,0,3,1.35,3,3v18.003C30,25.65,28.65,27,27,27z M15,7.501c-4.14,0-7.5,3.36-7.5,7.5 c0,4.141,3.359,7.5,7.5,7.5c4.139,0,7.501-3.359,7.501-7.5C22.501,10.861,19.139,7.501,15,7.501z M15,19.799 c-2.65,0-4.8-2.147-4.8-4.799c0-2.65,2.15-4.801,4.8-4.801c2.653,0,4.801,2.15,4.801,4.801C19.801,17.652,17.654,19.799,15,19.799z" />
                      </svg>
                      {__t('Load background')}
                    </div>
                  </div>)
              }

              <button
                className="default-button save-settings"
                type="submit"
              >
                {__t('Save settings')}
              </button>
              <div
                className="default-button save-settings"
                onClick={this.hideEdit}
              >
                {__t('Cancel')}
              </div>
              <div
                style={{ display: (!this.state.edit ? 'inline-block' : '') }}
                className="default-button edit-settings"
                onClick={() => (this.setState({ edit: true, showMoreText: false }))}
              >
                {__t('edit.profile')}
              </div>
            </div>
          </form>
        </div>
        );
  }
}

UserProfileMe.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

export default UserProfileMe;
