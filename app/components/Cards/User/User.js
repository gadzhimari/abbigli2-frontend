import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import { FetchingButton } from 'components';

import Avatar from '../../../components/Avatar';

import { __t } from '../../../i18n/translator';

import createProfileLink from '../../../lib/links/profile-link';

import './User.less';

class User extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
      city: PropTypes.object,
      profile_name: PropTypes.string,
      avatar: PropTypes.string,
      is_subscribed: PropTypes.bool,
    }).isRequired,
    follow: PropTypes.func.isRequired,
    openPopup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  state = {
    isSubscribed: this.props.user.is_subscribed,
    fetchingFollow: false,
  };

  handleFollow = () => {
    if (this.props.isAuthenticated) {
      this.setState(prevState => ({
        isSubscribed: !prevState.isSubscribed,
        fetchingFollow: true,
      }));

      this.props
        .follow(this.props.user.id)
        .then(() => this.setState({
          fetchingFollow: false,
        }));
    } else {
      this.props.openPopup('loginPopup');
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="user-card">
        <Link to={createProfileLink({ id: user.id })} >
          <div className="user-card__avatar">
            <Avatar
              className="avatar"
              imgClassName="avatar__img"
              avatar={user.avatar}
              thumbSize="86x86"
              alt={user.profile_name}
            />
          </div>
        </Link>
        <Link to={createProfileLink({ id: user.id })} >
          <div className="user-card__name">
            {this.props.user.profile_name}
          </div>
        </Link>
        <div className="user-card__city">
          {
            this.props.user.city
            &&
            `${this.props.user.city.name}, ${this.props.user.city.country.name}`
          }
        </div>
        <FetchingButton
          className="default-button"
          isFetching={this.state.fetchingFollow}
          type="button"
          onClick={this.handleFollow}
        >
          {
            this.state.isSubscribed
              ? <svg className="icon icon-add" viewBox="0 0 22 22">
                <path d="M19.9,13.1h-6.9v6.9c0,1.1-0.9,2.1-2.1,2.1s-2.1-0.9-2.1-2.1v-6.9H2.1C0.9,13.1,0,12.1,0,11 c0-1.1,0.9-2.1,2.1-2.1h6.9V2.1C8.9,0.9,9.9,0,11,0s2.1,0.9,2.1,2.1v6.9h6.9c1.1,0,2.1,0.9,2.1,2.1C22,12.1,21.1,13.1,19.9,13.1z"/>
              </svg>
              : <svg className="icon icon-add" viewBox="0 0 22 22">
                <path d="M19.9,13.1h-6.9v6.9c0,1.1-0.9,2.1-2.1,2.1s-2.1-0.9-2.1-2.1v-6.9H2.1C0.9,13.1,0,12.1,0,11 c0-1.1,0.9-2.1,2.1-2.1h6.9V2.1C8.9,0.9,9.9,0,11,0s2.1,0.9,2.1,2.1v6.9h6.9c1.1,0,2.1,0.9,2.1,2.1C22,12.1,21.1,13.1,19.9,13.1z"/>
              </svg>
          }
          {
            this.state.isSubscribed
              ? `- ${__t('Unsubscribe')}`
              : `+ ${__t('Subscribe')}`
          }
        </FetchingButton>
      </div >
    );
  }
}

export default User;
