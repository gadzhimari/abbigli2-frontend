import Type from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserProfile } from '../../components';
import ProfileSubMenu from './ProfileSubMenu';
import ProfileLoader from './components/ProfileLoaderDecorator';

import { uploadImage,
         loadProfile,
         saveChanges,
         deleteImage,
} from '../../ducks/Profile/actions';
import { openPopup } from '../../ducks/Popup/actions';

import './Profile.styl';

class Profile extends Component {
  state = { isEditing: false };

  componentWillUnmount() {
    document.body.classList.remove('profile-page--edit');
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
      data,
      isMe,
      me,
      childrenPath: path,
    } = this.props;

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

          <ProfileSubMenu isMe={isMe} data={data} path={path} />

          {React.Children
            .map(this.props.children, child => (
              React.cloneElement(child, {
                isMe, me,
              })
            ))}
        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  data: Type.shape(),
  childrenPath: Type.string,
  isMe: Type.bool.isRequired,
  children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
  me: Type.shape(),
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
