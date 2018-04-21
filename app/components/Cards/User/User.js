import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from '../../Link/Link';
import { Button } from '../../../components-lib';

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
    const subscriptionState = this.state.isSubscribed ? `- ${__t('Unsubscribe')}` : `+ ${__t('Subscribe')}`;

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
        <Button
          size="s"
          text={subscriptionState}
          isFetching={this.state.fetchingFollow}
          onClick={this.handleFollow}
        />
      </div>
    );
  }
}

export default User;
