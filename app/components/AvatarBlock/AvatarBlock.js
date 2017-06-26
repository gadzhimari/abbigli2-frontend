import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import deepEqual from 'deep-equal';

import { Menu } from 'components';

import { openPopup } from 'ducks/Popup/actions';
import { stagedPopup } from 'ducks/Auth/authActions';
import './AvatarBlock.styl';
import { __t } from './../../i18n/translator';

class AvatarBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      openUserMenu: false,
      openNotifications: false,
      profile: null,
    };
    this.openMenuToggle = this.openMenuToggle.bind(this);
  }

  componentDidMount() {
    const { itemsSections } = this.props;

    if (window.document) {
      window.addEventListener('click', (e) => {
        const openMenuContainer = document.querySelector('.main-menu');
        const dropdown = document.querySelector('.dropdown');

        if (!openMenuContainer || !dropdown) return;

        if (!openMenuContainer.contains(e.target)) {
          this.setState({
            openMenu: false,
          });
        }
      });

      window.addEventListener('click', (e) => {
        if (document.querySelector('.header__menu-item.you') || document.querySelector('.user-menu')) {
          if (
            document.querySelector('.header__menu-item.you').contains(e.target) ||
            document.querySelector('.user-menu').contains(e.target)
          ) {
            return;
          }
        }
        this.setState({
          openUserMenu: false,
        });
      });

      window.addEventListener('click', (e) => {
        if (document.querySelector('.header__menu-item.notice')) {
          if (
            document.querySelector('.header__menu-item.notice').contains(e.target)
          ) {
            return;
          }
        }

        this.setState({ openNotifications: false });
      });

      if (itemsSections.length > 0) {
        this.loadSideMenu();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    const { itemsSections } = this.props;

    if (!deepEqual(itemsSections, prevProps.itemsSections)) {
      this.loadSideMenu();
    }
  }


  loadSideMenu = () => {
    const menuHTML = window.document.querySelector('.dropdown').innerHTML;

    window.document.getElementById('swipeMenu').innerHTML = menuHTML;
  }

  openMenuToggle = () => {
    this.setState({ openMenu: !this.state.openMenu });
  }

  _openUserMenuToggle = () => {
    this.setState({ openUserMenu: !this.state.openUserMenu });
  }

  _openNotificationsToggle() {
    this.setState({ openNotifications: !this.state.openNotifications });
  }

  stagedPopupOpen = ({ currentTarget }) => this.props
    .dispatch(stagedPopup(currentTarget.dataset.type))

  modalButtonClick = ({ currentTarget }) => this.props
    .dispatch(openPopup(currentTarget.dataset.type || currentTarget.name))

  checkAuth = (e) => {
    const { isAuthenticated } = this.props;
    const { currentTarget } = e;

    if (!isAuthenticated) {
      this[currentTarget.dataset.callback](e);
    }
  }

  render() {
    const {
      isFetchingSections,
      itemsSections,
      isAuthenticated,
      toggleMenu,
      onLogoutClick,
    } = this.props;
    const { openMenu } = this.state;

    const dropdownClass = openMenu
      ? 'header__menu-item main-menu open-menu'
      : 'header__menu-item main-menu';

    const isMobile = window.innerWidth <= 700;
    const menuButtonHandler = isMobile
      ? toggleMenu
      : this.openMenuToggle;

    const avatarStyle = {
      width: '30px',
      height: '30px',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundImage: `url(${this.props.me.avatar})`,
      marginTop: '14px',
    };

    return (
      <div className="header__menu">
        <div
          className="header__menu-item search-mobile"
          onClick={this.modalButtonClick}
          data-type="searchPopup"
        >
          <div className="icon-wrap">
            <div className="icon"></div>
            <div className="menu__item-name">{__t('Search')}</div>
          </div>
        </div>

        <div
          className={dropdownClass}
          onClick={menuButtonHandler}
        >
          <div className="icon-wrap">
            <div className="icon"></div>
            <div className="menu__item-name">
              {__t('Sections')}
            </div>
          </div>
          <div className="dropdown-corner"></div>
          <a className="main-menu__mobile toggleButton">
            <svg className="icon">
              <use href="#menu-mobile"></use>
            </svg>
          </a>
          <Menu
            wrapperClass="dropdown"
            isFetchingSections={isFetchingSections}
            itemsSections={itemsSections}
            modalButtonClick={this.modalButtonClick}
          />
        </div>

        <Link
          className="header__menu-item create-post"
          onClick={this.checkAuth}
          to={(isAuthenticated && this.props.me) ? `/post/new` : ''}
          data-type="register"
          data-callback="stagedPopupOpen"
        >
          <div className="icon-wrap">
            <div className="icon"></div>
            <div className="menu__item-name">{__t('Create')}</div>
          </div>
        </Link>

        {
          !isAuthenticated &&
          <div
            className="header__menu-item login"
            onClick={this.stagedPopupOpen}
            data-type="login"
          >
            <div className="icon-wrap">
              <div className="icon"></div>
              <div className="menu__item-name">
                {__t('Login')}
              </div>
            </div>
          </div>
        }

        {
          isAuthenticated
            ? (<div
              className={"header__menu-item you"}
              onClick={this._openUserMenuToggle}
            >
              <div
                className="icon"
                style={
                  this.props.me.avatar
                    ? avatarStyle
                    : {}
                }
              />
              <div className="menu__item-name">
                {__t('You')}
              </div>
            </div>)
            : (<div
              className={"header__menu-item registration"}
              onClick={this.stagedPopupOpen}
              data-type="register"
            >
              <div className="icon" />
              <div className="menu__item-name">
                {__t('sign.up')}
              </div>
            </div>)
        }

        {(isAuthenticated && this.props.me) &&
          <div className={`user-menu ${this.state.openUserMenu ? 'user-menu--open' : ''}`}>
            <Link
              to={`/profile/${this.props.me.id}`}
              className="user-menu__item profile"
              onClick={() => this.setState({ openUserMenu: false })}
            >
              <svg className="icon">
              </svg>
              {__t('My profile')}
            </Link>
            <Link
              className="user-menu__item messages"
              to={`/profile/${this.props.me.id}/messages`}
              onClick={() => this.setState({ openUserMenu: false })}
            >
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8">
                <path d="M9,0H1C0.45,0,0.005,0.449,0.005,1L0,7c0,0.55,0.45,1,1,1h8c0.55,0,1-0.45,1-1V1C10,0.449,9.55,0,9,0z M9,2
                  L5,4.5L1,2V1l4,2.5L9,1V2z"/>
</svg>
              {__t('Messages')}
            </Link>
            <Link className="user-menu__item feed" to={`/profile/${this.props.me.id}/feed`} onClick={() => this.setState({ openUserMenu: false })}>
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M6,10V5h4v5H6z M6,0h4v3H6V0z M0,7h4v3H0V7z M0,0h4v5H0V0z" />
              </svg>

              {__t('Feed')}
            </Link>
            <a onClick={onLogoutClick} className="user-menu__item logout">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                <path d="M3.938,6.995l0.783,0.783L7.5,5L4.722,2.223L3.938,3.006l1.434,1.438H0v1.111h5.372L3.938,6.995z M8.889,0
                  H1.111C0.494,0,0,0.501,0,1.111v2.223h1.111V1.111h7.777v7.777H1.111V6.667H0v2.222C0,9.5,0.494,10,1.111,10h7.777
	C9.5,10,10,9.5,10,8.889V1.111C10,0.501,9.5,0,8.889,0z"/>
</svg>
              {__t('Logout')}
            </a>
          </div>
        }

      </div>
    );
  }
}

AvatarBlock.propTypes = {
  itemsSections: PropTypes.array.isRequired,
  isFetchingSections: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
  toggleMenu: PropTypes.func,
  onLogoutClick: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    me: state.Auth.me,
  };
}

export default connect(mapStateToProps)(AvatarBlock);
