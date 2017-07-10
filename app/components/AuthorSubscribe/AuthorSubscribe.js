import React, { Component } from 'react';
import { Link } from 'components';
import { connect } from 'preact-redux';
import { setFollow } from 'actions/follow';
import { stagedPopup } from 'ducks/Auth/authActions';

import { __t } from './../../i18n/translator';
import { DOMAIN_URL } from 'config';

class AuthorSubscribe extends Component {

  render() {
    const { dispatch, isAuthenticated, slug, user } = this.props;
    return (
      <div className="author-subscribe">
        <Link className="author-subscribe__ava" to={`/profile/${user.id}/`}>
          {
            user.avatar
              ? <img className="author-ava" src={`${DOMAIN_URL}thumbs/unsafe/65x65/${user.avatar}`} alt={user.profile_name} />
              : <img className="author-ava" src={`/images/svg/avatar.svg`} alt={user.profile_name} />
          }
        </Link>
        <div className="author-subscribe__name">
          {
            user.profile_name
              ? <Link to={`/profile/${user.id}/`}>{user.profile_name}</Link>
              : <Link to={`/profile/${user.id}/`}>ID {user.id}</Link>
          }

          {

              this.props.me && this.props.me.id == user.id
              ? (
                <Link className="subscribe-button" to={`/profile/${user.id}/post/edit/${slug}`}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                    <path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409 l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z"/>
                  </svg>
                  {__t('Edit')}
                </Link>
              )
              : user.is_subscribed
                ? (<button
                  className="subscribe-button"
                  type="button"
                  onClick={() => {
                    isAuthenticated ? dispatch(setFollow(user.id)) : dispatch(stagedPopup('register'));
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2">
                    <path d="M10,0v2H0V0H10z"/>
                  </svg>
                  {__t('Unsubscribe')}
                </button>)
                : (<button
                  className="subscribe-button"
                  type="button"
                  onClick={() => {
                    isAuthenticated ? dispatch(setFollow(user.id)) : dispatch(stagedPopup('register'));
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <path d="M10,6H6v4H4V6H0V4h4V0h2v4h4V6z" />
                  </svg>
                  {__t('Subscribe')}
                </button>)
          }

        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const auth = (state.Auth) || { me: null, isAuthenticated: false };

  return {
    me: auth.me,
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(AuthorSubscribe);
