import React, { Component, PropTypes } from 'react';
import { connect } from 'preact-redux';

import {
  UserProfile,
  UserProfileMe,
  Link,
} from 'components';

import Helmet from 'react-helmet';

import './Profile.styl';

import { __t } from './../../i18n/translator';

import FollowersPopup from './components/FollowersPopup';
import ProfileLoader from './components/ProfileLoaderDecorator';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubscribers: false,
      showSubscribersFollowing: false,
    };
  }

  componentDidMount() {
    window.addEventListener('click', e => {
      if (e.target.className === 'popup-wrap') {
        this.setState({
          showSubscribers: false,
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.hideFollowers();
    }
  }


  showFollowing = show => {
    this.setState({
      showSubscribersFollowing: show,
    });
  }

  hideFollowers = () => {
    this.setState({
      showSubscribers: false,
      showSubscribersFollowing: false,
    });
  }

  render() {

    const {
      dispatch,
      isAuthenticated,
      user,
      errors,
      isMe,
      following,
      followers,
      me,
      childrenPath,
    } = this.props;

    const { showSubscribersFollowing } = this.state;


    const ProfileComponent = isMe
      ? UserProfileMe
      : UserProfile;

    const childrenWithProps = React.Children
      .map(this.props.children, child => React.cloneElement(child, {
        isMe,
        me,
      })
      );

    const title = isMe
      ? 'My profile'
      : `Profile ${user.profile_name || user.id}`;

    return (
      <div
        className={`container-fluid user-profile-page ${this.state.showSubscribers ? ' modal-open-new' : ''}`}
      >
        <Helmet
          title={title}
          meta={[
            {
              name: 'description',
              content: user.info,
            },
          ]}
        />
        <div
          className="popup-wrap"
          id="mySubscribers"
          style={{ display: (this.state.showSubscribers ? 'block' : 'none') }}
        >
          <FollowersPopup
            followers={followers}
            following={following}
            showSubscribersFollowing={showSubscribersFollowing}
            hideFollowers={this.hideFollowers}
            showFollowing={this.showFollowing}
            isMe={isMe}
          />
        </div>


        {
          childrenPath !== 'messages'
            ? <ProfileComponent
              isAuthenticated={isAuthenticated}
              me={me}
              data={user}
              dispatch={dispatch}
              errors={errors}
              showFollowers={() => this.setState({ showSubscribersFollowing: false, showSubscribers: true })}
            />
            : null
        }

        <div className="profile__submenu">
          <a className="profile-submenu__item back">
            <div className="icon-wrap">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="248.914 244 14.173 24">
                <polygon fill="#0D6AE3" points="259.954,244 248.914,256 259.954,268 263.087,264.596 255.178,256 263.087,247.404 	" />
              </svg>
            </div>
          </a>

          <Link
            to={`/profile/${user.id}/`}
            className={"profile-submenu__item my-abbigli " + (!childrenPath ? 'active' : '')}
          >
            <div className="icon-wrap">
              <div className="icon" />
            </div>
            {__t('My Abbigli')}
          </Link>
          {
            (isMe || user.is_favorite_visible)
            &&
            <Link
              to={`/profile/${user.id}/favorites`}
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
            (isMe || user.is_feed_visible)
            &&
            <Link
              to={`/profile/${user.id}/feed`}
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
              to={`/profile/${user.id}/messages`}
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
        </div>

        {childrenWithProps}

      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  childrenPath: PropTypes.string,
  following: PropTypes.any,
  followers: PropTypes.array.isRequired,
  isMe: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
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
  } = state.Auth || {
      isAuthenticated: false,
      isFetching: true,
      me: {},
    };
  const {
    data,
    isFetching,
    errors,
    isMe,
    followers,
    following,
  } = state.Profile;

  return {
    me,
    isAuthenticated,
    authFetching,
    errorMessage,
    user: data,
    isFetching,
    errors,
    isMe,
    followers,
    following,
  };
}

export default connect(mapStateToProps)(ProfileLoader(Profile));
