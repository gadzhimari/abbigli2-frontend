import React, { Component } from 'react';
import {
  Link
} from 'components';
import { connect } from 'preact-redux';
import { setFollow } from 'actions/follow';
import { loginPopup } from 'ducks/Popup'

import { __t } from './../../i18n/translator';

class AuthorSubscribe extends Component {

  render() {
    const { dispatch, isAuthenticated, slug } = this.props;
    const {
      avatar,
      profile_name,
      id,
      is_subscribed: isSubscribed,
    } = this.props.user || {};
    return (
      <div className="author-subscribe">
        <Link className="author-subscribe__ava" to={`/profile/${id}/`}>
          {
            avatar
              ? <img className="author-ava" src={`https://abbigli.com/thumbs/unsafe/65x65/${avatar}`} alt={profile_name} />
              : <img className="author-ava" src={`/images/svg/avatar.svg`} alt={profile_name} />
          }
        </Link>
        <div className="author-subscribe__name">
          {
            profile_name
              ? <Link to={`/profile/${id}/`}>{profile_name}</Link>
              : <Link to={`/profile/${id}/`}>ID {id}</Link>
          }

          {

              this.props.me && this.props.me.id == id
              ? (
                <Link className="subscribe-button" to={`/profile/${id}/post/edit/${slug}`}>
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
<path d="M0,14.249V18h3.75L14.807,6.941l-3.75-3.749L0,14.249z M17.707,4.042c0.391-0.391,0.391-1.02,0-1.409
	l-2.34-2.34c-0.391-0.391-1.019-0.391-1.408,0l-1.83,1.829l3.749,3.749L17.707,4.042z"/>
</svg>

                  Edit
                </Link>
              )
              : isSubscribed
                ? (<button
                  className="subscribe-button"
                  type="button"
                  onClick={() => {
                    isAuthenticated ? dispatch(setFollow(id)) : dispatch(loginPopup(true))
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2">
    <path d="M10,0v2H0V0H10z"/>
</svg> {__t('Unsubscribe')}
                </button>)
                : (<button
                  className="subscribe-button"
                  type="button"
                  onClick={() => {
                    isAuthenticated ? dispatch(setFollow(id)) : dispatch(loginPopup(true))
                  }}
                >
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
    <path d="M10,6H6v4H4V6H0V4h4V0h2v4h4V6z"/>
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
