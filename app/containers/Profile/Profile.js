import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserProfile, Link } from '../../components';

import { __t } from './../../i18n/translator';
import { gaSendClickEvent } from '../../lib/analitics';

import ProfileLoader from './components/ProfileLoaderDecorator';
import { uploadImage, loadProfile, saveChanges, deleteImage } from '../../ducks/Profile/actions';
import { openPopup } from '../../ducks/Popup/actions';

import './Profile.styl';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubscribers: false,
      showSubscribersFollowing: false,
      isEditing: false,
    };
  }

  componentWillUnmount() {
    document.body.classList.remove('profile-page--edit');
  }

  onClickMyAbbigli = () => {
    gaSendClickEvent('profile', 'mypage');
  }

  onClickFavorites = () => {
    gaSendClickEvent('profile', 'favorites');
  }

  onClickFeed = () => {
    gaSendClickEvent('profile', 'feed');
  }

  onClickMessages = () => {
    gaSendClickEvent('profile', 'messages');
  }

  onClickAbout = () => {
    gaSendClickEvent('profile', 'about_me');
  }

  handleEditing = (status) => {
    this.setState({ isEditing: status });

    if (status) {
      document.body.classList.add('profile-page--edit');
    } else {
      document.body.classList.remove('profile-page--edit');
    }
  }

  render() {
    const {
      dispatch,
      isAuthenticated,
      data,
      errors,
      isMe,
      following,
      followers,
      me,
      childrenPath,
    } = this.props;

    const childrenWithProps = React.Children
      .map(this.props.children, child => React.cloneElement(child, { isMe, me }));

    return (
      <div>
        <UserProfile
          {...this.props}
          handleEditing={this.handleEditing}
          isEditing={this.state.isEditing}
        />

        <main className="main profile">
          {this.state.isEditing &&
            <div className="main__overlay" />
          }

          {/* TODO: Вынести в отдельный компонент */}
          <div className="profile__submenu">
            <a className="profile-submenu__item back">
              <div className="icon-wrap">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="248.914 244 14.173 24">
                  <polygon fill="#0D6AE3" points="259.954,244 248.914,256 259.954,268 263.087,264.596 255.178,256 263.087,247.404 	" />
                </svg>
              </div>
            </a>

            <Link
              to={`/profile/${data.id}/`}
              onClick={this.onClickMyAbbigli}
              className={"profile-submenu__item my-abbigli " + (!childrenPath ? 'active' : '')}
            >
              <div className="icon-wrap">
                <div className="icon" />
              </div>
              {__t('My Abbigli')}
            </Link>
            {
              (isMe || data.is_favorite_visible)
              &&
              <Link
                to={`/profile/${data.id}/favorites`}
                onClick={this.onClickFavorites}
                className={"profile-submenu__item favorites " + (childrenPath === 'favorites' ? 'active' : '')}
              >
                <div className="icon-wrap">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31.193">
                    <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552 C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z" />
                  </svg>
                </div>
                {__t('Favorites')}
              </Link>
            }
            {
              (isMe || data.is_feed_visible)
              &&
              <Link
                to={`/profile/${data.id}/feed`}
                onClick={this.onClickFeed}
                className={"profile-submenu__item feed " + (childrenPath === 'feed' ? 'active' : '')}
              >
                <div className="icon-wrap">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <path d="M6,10V5h4v5H6z M6,0h4v3H6V0z M0,7h4v3H0V7z M0,0h4v5H0V0z" />
                  </svg>
                </div>
                {__t('Feed')}
              </Link>
            }

            {
              isMe
              &&
              (<Link
                to="/chat"
                onClick={this.onClickMessages}
                className={"profile-submenu__item feed " + (childrenPath === 'messages' ? 'active' : '')}
              >
                <div className="icon-wrap">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
                    <path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2
                      L5,4.5L1,2V1l4,2.5L9,1V2z"/>
                  </svg>
                </div>
                {__t('Messages')}
              </Link>)
            }
            {
              (<Link
                to={`/profile/${data.id}/about`}
                onClick={this.onClickAbout}
                className={"profile-submenu__item feed " + (childrenPath === 'about' ? 'active' : '')}
              >
                <div className="icon-wrap">
                  <svg className="icon" viewBox="0 0 22.2 25.6">
                    <g id="XMLID_44_">
                      <path id="XMLID_61_" className="st0" d="M11.1,14C6.6,14,2.6,15.3,0,17.3c1.3,4.8,5.8,8.3,11.1,8.3c5.3,0,9.8-3.5,11.1-8.3 C19.6,15.3,15.6,14,11.1,14z" />
                      <circle id="XMLID_77_" className="st0" cx="11.1" cy="6.3" r="6.3" />
                    </g>
                  </svg>
                </div>
                {__t('About me')}
              </Link>)
            }
          </div>

          {childrenWithProps}
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  data: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  childrenPath: PropTypes.string,
  following: PropTypes.any,
  followers: PropTypes.array.isRequired,
  isMe: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  followFetching: PropTypes.bool.isRequired,
  children: PropTypes.any,
  me: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.any,
};


function mapStateToProps(state) {
  const {
    me,
    isAuthenticated,
    errorMessage,
    isFetching: authFetching,
  } = state.Auth;
  const {
    data,
    isFetching,
    errors,
    isMe,
    followers,
    following,
    uploadingImage,
  } = state.Profile;

  return {
    me,
    isAuthenticated,
    authFetching,
    errorMessage,
    data,
    isFetching,
    errors,
    isMe,
    followers,
    following,
    followFetching: state.Follow.isFetching,
    geoCity: state.Geo.city,
    uploadingImage,
  };
}

const mapDispatchToProps = dispatch => ({
  /** Используется для загрузки данных пользователя */
  loadProfile: (...args) => dispatch(loadProfile(...args)),
  /** Используется для загрузки фоновой картинки и аватарки,
   * навешивать на input с type="file" */
  uploadImage: event => dispatch(uploadImage(event)),
  /** Ипользуется для сохранения изменений в профиле */
  saveChanges: data => dispatch(saveChanges(data)),
  /** Используется для открытия попапов */
  openPopup: (...args) => dispatch(openPopup(...args)),
  /** Используется для удаления выбранного изображения профиля */
  deleteImage: name => dispatch(deleteImage(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLoader(Profile));
