import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { DOMAIN_URL } from 'config';
import { __t } from './../../i18n/translator';

class UserMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openUserMenu: false,
    };
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (!this.state.openUserMenu) return;

      if (document.querySelector('.header__menu-item.you') || document.querySelector('.user-menu')) {
        if (
          document.querySelector('.header__menu-item.you').contains(e.target) ||
          document.querySelector('.user-menu').contains(e.target)
        ) {
          return;
        }
      }
      this.closeUserMenuHandler();
    });
  }

  openUserMenuHandler = () => this.setState({
    openUserMenu: true,
  });

  closeUserMenuHandler = () => this.setState({
    openUserMenu: false,
  });

  render() {
    const { onLogoutClick, user } = this.props;

    return (
      <div
        className="header__menu-item you"
        onClick={this.openUserMenuHandler}
      >
        <div className="avatar">
          {
            user.avatar
              ? <img
                src={`${DOMAIN_URL}thumbs/unsafe/30x30/${user.avatar}`}
                alt={user.profile_name ? user.profile_name : `ID:${user.id}`}
              />
              : <svg viewBox="0 0 19.2 22.721">
                <path d="M9.601,22.721c-4,0-7.536-2.048-9.601-5.151 c0.048-3.185,6.4-4.929,9.601-4.929c3.184,0,9.553,1.744,9.6,4.929C17.136,20.673,13.601,22.721,9.601,22.721z M9.601,9.6 C6.944,9.6,4.8,7.457,4.8,4.801C4.8,2.145,6.944,0,9.601,0s4.8,2.145,4.8,4.801C14.4,7.457,12.257,9.6,9.601,9.6z"/>
              </svg>


          }
        </div>

        {
          this.state.openUserMenu
          &&
          <div className="user-menu user-menu--open">
            <Link
              to={`/profile/${user.id}`}
              className="user-menu__item profile"
              onClick={this.closeUserMenuHandler}
            >
              <svg className="icon" />
              {__t('My profile')}
            </Link>
            <Link
              className="user-menu__item messages"
              to="/chat"
              onClick={this.closeUserMenuHandler}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
                <path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2 L5,4.5L1,2V1l4,2.5L9,1V2z" />
              </svg>
              {__t('Messages')}
            </Link>
            <Link
              className="user-menu__item feed"
              to={`/profile/${user.id}/feed`}
              onClick={this.closeUserMenuHandler}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M6,10V5h4v5H6z M6,0h4v3H6V0z M0,7h4v3H0V7z M0,0h4v5H0V0z" />
              </svg>
              {__t('Feed')}
            </Link>
            <a
              onClick={onLogoutClick}
              className="user-menu__item logout"
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M3.938,6.995l0.783,0.783L7.5,5L4.722,2.223L3.938,3.006l1.434,1.438H0v1.111h5.372L3.938,6.995z M8.889,0 H1.111C0.494,0,0,0.501,0,1.111v2.223h1.111V1.111h7.777v7.777H1.111V6.667H0v2.222C0,9.5,0.494,10,1.111,10h7.777 C9.5,10,10,9.5,10,8.889V1.111C10,0.501,9.5,0,8.889,0z" />
              </svg>
              {__t('Logout')}
            </a>
          </div>
        }
      </div>
    );
  }
}

export default UserMenu;
