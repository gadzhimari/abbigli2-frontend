import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link/Link';
import Button from '../Button/Button';
import Dropdown from '../_basicClasses/Dopdown';
import Avatar from '../Avatar';

import { gaSendClickEvent } from '../../lib/analitics';
import { __t } from './../../i18n/translator';

class UserMenu extends Dropdown {
  componentDidMount() {
    this.setupOutsideClickHandler(this.close);
  }

  onDropdownClick = ({ target, currentTarger }) => {
    if (target !== currentTarger) {
      this.close();
    }
  }

  onOpen = () => {
    gaSendClickEvent('menu', 'profile');
  }

  onClickItem = (e, { name }) => {
    gaSendClickEvent('profile', name);
  }

  onLogoutClick = (...attr) => {
    this.onClickItem(...attr);
    this.props.onLogoutClick(...attr);
  }

  render() {
    const { user } = this.props;

    return (
      <div
        className="header__menu-item you"
        ref={root => (this.root = root)}
      >
        <Avatar
          avatar={user.avatar}
          thumbSize="30x30"
          className="avatar"
          onClick={this.toggle}
          imgClassName="avatar__image"
        />

        {this.state.opened &&
          <div
            className="user-menu user-menu--open"
            onClick={this.onDropdownClick}
          >
            <Link
              to={`/profile/${user.id}`}
              className="user-menu__item profile"
              onClick={this.onClickItem}
              name="profile"
            >
              <svg className="icon" />
              {__t('My profile')}
            </Link>

            <Link
              className="user-menu__item messages"
              to="/chat"
              onClick={this.onClickItem}
              name="message"
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
                <path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2 L5,4.5L1,2V1l4,2.5L9,1V2z" />
              </svg>
              {__t('Messages')}
            </Link>

            <Link
              className="user-menu__item feed"
              onClick={this.onClickItem}
              to={`/profile/${user.id}/feed`}
              name="feed"
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M6,10V5h4v5H6z M6,0h4v3H6V0z M0,7h4v3H0V7z M0,0h4v5H0V0z" />
              </svg>
              {__t('Feed')}
            </Link>

            <Button
              onClick={this.onLogoutClick}
              className="user-menu__item logout"
              name="logout"
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M3.938,6.995l0.783,0.783L7.5,5L4.722,2.223L3.938,3.006l1.434,1.438H0v1.111h5.372L3.938,6.995z M8.889,0 H1.111C0.494,0,0,0.501,0,1.111v2.223h1.111V1.111h7.777v7.777H1.111V6.667H0v2.222C0,9.5,0.494,10,1.111,10h7.777 C9.5,10,10,9.5,10,8.889V1.111C10,0.501,9.5,0,8.889,0z" />
              </svg>
              {__t('Logout')}
            </Button>
          </div>
        }
      </div>
    );
  }
}

UserMenu.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    profile_name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

export default UserMenu;
