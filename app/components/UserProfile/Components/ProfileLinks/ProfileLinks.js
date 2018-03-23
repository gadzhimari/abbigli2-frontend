/* eslint react/sort-comp: 0 */

import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { FetchingButton } from '../../../../components';
import Link from '../../../Link/Link';

import follow from '../../../../ducks/Profile/actions/follow';
import { __t } from '../../../../i18n/translator';

import './ProfileLinks.less';

class ProfileLinks extends PureComponent {
  handleFollow = () => {
    const { is_subscribed, id } = this.props.data;

    this.props.dispatch(follow(id, is_subscribed));
  }

  openFollowers = () => {
    this.props.openPopup('followersPopup');
  }

  openFollowing = () => {
    this.props.openPopup('followingPopup');
  }

  render() {
    const { data, isMe } = this.props;

    if (!isMe) {
      return this.renderForVisitors();
    }

    return (
      <div className="profile-my">
        <div className="main__overlay" />
        <Link
          className="profile-my__item"
          to="/chat"
        >
          <svg className="icon icon-messages" viewBox="0 0 25 23">
            <path d="M21.4,13.6l-0.2,4.6l-3.8-3.1c-0.4,0.1-0.9,0.1-1.3,0.1c-5,0-9-3.4-9-7.6c0-4.2,4-7.6,9-7.6s9,3.4,9,7.6 C25,10.1,23.6,12.2,21.4,13.6z M15.4,16.7c0.3,0,0.7,0,1,0c-1.6,2-4.3,3.3-7.4,3.3c-0.5,0-0.9,0-1.3-0.1L3.8,23l-0.2-4.6 C1.4,17,0,14.9,0,12.4c0-3.3,2.5-6.1,6-7.1c-0.4,0.9-0.6,1.9-0.6,3C5.3,12.9,9.8,16.7,15.4,16.7z" />
          </svg>
          {__t('My messages')}
          <div className="profile-my__item-number">
            {data.unread_messages_num}
          </div>
        </Link>
        <Link
          className="profile-my__item"
          onClick={this.openFollowers}
        >
          <svg className="icon icon-subscribers" viewBox="0 0 29.2 29.6">
            <g id="XMLID_1_">
              <path id="XMLID_3_" className="st0" d="M0,21.3c1.3,4.8,5.8,8.3,11.1,8.3s9.8-3.5,11.1-8.3c-2.6-2-6.6-3.2-11.1-3.2S2.6,19.3,0,21.3z" />
              <circle id="XMLID_4_" className="st0" cx="11.1" cy="10.3" r="6.3" />
              <path id="XMLID_5_" className="st0" d="M20.4,10.3c0,0.7-0.1,1.3-0.2,1.9c2.5-0.9,4.2-3.2,4.2-5.9c0-3.5-2.8-6.3-6.3-6.3 c-1.5,0-3,0.6-4.1,1.5C17.7,2.7,20.4,6.2,20.4,10.3z" />
              <path id="XMLID_27_" className="st0" d="M19.6,14.1c-0.3,0.7-0.7,1.4-1.2,2c2.1,0.7,4.1,1.6,5.6,2.8l1.6,1.2l-0.5,2 c-0.1,0.5-0.3,1-0.5,1.5c2.2-1.5,3.9-3.7,4.6-6.3C26.9,15.5,23.4,14.4,19.6,14.1z" />
            </g>
          </svg>
          {__t('My followers')}
          <div className="profile-my__item-number">
            {data.followers_count}
          </div>
        </Link>
        <Link
          className="profile-my__item"
          onClick={this.openFollowing}
        >
          <svg className="icon icon-user" viewBox="0 0 22.2 25.6">
            <path d="M11.1,14C6.6,14,2.6,15.3,0,17.3c1.3,4.8,5.8,8.3,11.1,8.3c5.3,0,9.8-3.5,11.1-8.3 C19.6,15.3,15.6,14,11.1,14z" />
            <circle cx="11.1" cy="6.3" r="6.3" />
          </svg>
          <div className="profile-my__item-number">
            {data.following_count}
          </div>
          {__t('My following')}
        </Link>
        <div
          className="profile-my__item"
        >
          <svg className="icon icon-like" viewBox="0 0 34 31.193">
            <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552 C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z" />
          </svg>
          {__t('Likes')}
          <div className="profile-my__item-number">
            {data.likes_num}
          </div>
        </div>
      </div >
    );
  }

  renderForVisitors = () => (
    <div className="profile-my">
      <Link
        className="profile-my__item"
        onClick={this.openFollowers}
        data-type="followers"
        data-title={__t('Followers')}
      >
        <svg className="icon icon-subscribers" viewBox="0 0 29.2 29.6">
          <g id="XMLID_1_">
            <path id="XMLID_3_" className="st0" d="M0,21.3c1.3,4.8,5.8,8.3,11.1,8.3s9.8-3.5,11.1-8.3c-2.6-2-6.6-3.2-11.1-3.2S2.6,19.3,0,21.3z" />
            <circle id="XMLID_4_" className="st0" cx="11.1" cy="10.3" r="6.3" />
            <path id="XMLID_5_" className="st0" d="M20.4,10.3c0,0.7-0.1,1.3-0.2,1.9c2.5-0.9,4.2-3.2,4.2-5.9c0-3.5-2.8-6.3-6.3-6.3 c-1.5,0-3,0.6-4.1,1.5C17.7,2.7,20.4,6.2,20.4,10.3z" />
            <path id="XMLID_27_" className="st0" d="M19.6,14.1c-0.3,0.7-0.7,1.4-1.2,2c2.1,0.7,4.1,1.6,5.6,2.8l1.6,1.2l-0.5,2 c-0.1,0.5-0.3,1-0.5,1.5c2.2-1.5,3.9-3.7,4.6-6.3C26.9,15.5,23.4,14.4,19.6,14.1z" />
          </g>
        </svg>
        {__t('Followers')}
        <div className="profile-my__item-number">
          {this.props.data.followers_count}
        </div>
      </Link>
      <div
        className="profile-my__item"
      >
        <svg className="icon icon-like" viewBox="0 0 34 31.193">
          <path d="M17,31.193l-2.467-2.242C5.778,21.011,0,15.774,0,9.35C0,4.113,4.113,0,9.351,0C12.308,0,15.147,1.377,17,3.552 C18.853,1.377,21.691,0,24.649,0C29.886,0,34,4.113,34,9.35c0,6.425-5.781,11.661-14.537,19.618L17,31.193z" />
        </svg>
        {__t('Likes')}
        <div className="profile-my__item-number">
          {this.props.data.likes_num}
        </div>
      </div>
      <FetchingButton
        className="default-button"
        isFetching={this.props.isFetchingFollow}
        type="button"
        onClick={this.handleFollow}
      >
        {
          this.props.data.is_subscribed ? '-' : '+'
        }
        <span className="profile-my__item-subscribe">
          {
            this.props.data.is_subscribed
              ? ` ${__t('Unsubscribe')}`
              : ` ${__t('Subscribe')}`
          }
        </span>
      </FetchingButton>
    </div>
  );
}

const mapState = ({ Profile }) => ({
  isFetchingFollow: Profile.isFollowing,
});

export default connect(mapState)(ProfileLinks);
