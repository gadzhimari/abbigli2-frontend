import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import deepEqual from 'deep-equal';

import { fetchData as fetchDataSections } from 'ducks/Sections';
import {
  loginPopup,
  registerPopup,
  supportPopup,
  confirmPopup,
  setpassPopup,
  confirmResetPopup,
} from 'ducks/Popup';
import './AvatarBlock.styl';
import { __t } from './../../i18n/translator';

import { searchPopup } from 'ducks/Popup';

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

  componentWillMount() {
    const { dispatch, itemsSections } = this.props;

    if (itemsSections.length === 0) {
      dispatch(fetchDataSections());
    }
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

  openRegister = () => {
    const { isAuthenticated, dispatch } = this.props;
    const shouldConfirm = JSON.parse(localStorage.getItem('openConfirm'));
    const shouldSetpass = JSON.parse(localStorage.getItem('openSetpass'));
    if (isAuthenticated) {
      this._openUserMenuToggle();

      return;
    }

    if (shouldConfirm) {
      dispatch(confirmPopup(true));
    } else if (shouldSetpass) {
      dispatch(setpassPopup(true));
    } else {
      dispatch(registerPopup(true));
    }
  }

  openLogin = () => {
    const { dispatch } = this.props;
    const shouldConfirm = JSON.parse(localStorage.getItem('openResetConfirm'));
    const shouldSetpass = JSON.parse(localStorage.getItem('openSetpassReset'));

    if (shouldConfirm) {
      dispatch(confirmResetPopup(true));
    } else if (shouldSetpass) {
      dispatch(setpassPopup(true));
    } else {
      dispatch(loginPopup(true));
    }
  }

  render() {
    const {
      isFetchingSections,
      itemsSections,
      isAuthenticated,
      dispatch,
      toggleMenu,
    } = this.props;
    const { openMenu } = this.state;

    const dropdownClass = openMenu
      ? 'header__menu-item main-menu open-menu'
      : 'header__menu-item main-menu';

    const isMobile = window.innerWidth <= 700;
    const menuButtonHandler = isMobile
      ? toggleMenu
      : this.openMenuToggle;

    return (
      <div className="header__menu">
        <a
          className="header__menu-item search-mobile"
          onClick={() => dispatch(searchPopup())}
        >
          <div className="icon-wrap">
            <div className="icon"></div>
            <div className="menu__item-name">{__t('Search')}</div>
          </div>
        </a>

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
          <div className="dropdown">
            <div className="main-menu__items">
              <Link className="main-menu__item" to="/new-products/">
                <div className="icon icon-new"></div>
                <div className="main-menu__item-name">{__t('New')}</div>
              </Link>
              <Link className="main-menu__item" to="/blogs/">
                <div className="icon icon-blog"></div>
                <div className="main-menu__item-name">{__t('Blogs')}</div>
              </Link>
              <Link className="main-menu__item" to="/popular-products/">
                <div className="icon icon-popular"></div>
                <div className="main-menu__item-name">{__t('Popular')}</div>
              </Link>
              <Link className="main-menu__item" to="/events/">
                <div className="icon icon-event"></div>
                <div className="main-menu__item-name">{__t('Events')}</div>
              </Link>
              <Link className="main-menu__item" to="/set-the-mood/">
                <div className="icon icon-mood"></div>
                <div className="main-menu__item-name">{__t('Create.a.mood')}</div>
              </Link>
              <Link className="main-menu__item" to="/nearest-products/">
                <div className="icon icon-beside"></div>
                <div className="main-menu__item-name">{__t('Nearby')}</div>
              </Link>
              <div className="main-menu__item">
                <div className="icon icon-sections"></div>
                <div className="main-menu__item-name">{__t('Sections')}</div>
                <div className="main-menu__item-corner"></div>
              </div>
            </div>
            <div className="main-menu__sections">
              {
                (!isFetchingSections && itemsSections.length > 0)
                && itemsSections.map(item => (<Link
                  className="main-menu__section"
                  to={`/sections/${item.slug}`}
                  key={`section--${item.slug}`}
                >
                  {item.title}
                </Link>
                ))
              }

            </div>
            <div className="main-menu__footer">
              <Link className="main-menu__footer-item" to="/page/about">{__t('About')}</Link>
              <Link className="main-menu__footer-item" to="/page/faq">{__t('FAQ')}</Link>
              <a
                className="main-menu__footer-item"
                onClick={() => dispatch(supportPopup(true))}
              >
                {__t('Support')}
              </a>
              <div className="social-buttons">
                <a className="social-btn facebook" target="_blank" href="https://www.facebook.com/AbbigliHandmade/">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.419 16.005">
                    <path d="M7.419,5.279L4.93,5.284V3.609c0,0-0.053-0.919,0.956-0.919c0-0.01,1.522,0,1.522,0V0.001H4.72
                      c0,0-3.081-0.178-3.081,3.498v1.792L0,5.295v2.662h1.639v8.048H4.93V7.957h2.206L7.419,5.279z"/>
</svg>

                </a>
                <a className="social-btn pinterest" target="_blank" href="https://ru.pinterest.com/abbiglicom/">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.912 15.975">
                    <path d="M2.34,9.239c0.802-1.365-0.258-1.664-0.425-2.654c-0.679-4.043,4.847-6.806,7.741-3.98 c2.002,1.957,0.684,7.975-2.545,7.348C4.02,9.356,8.626,4.567,6.158,3.626c-2.006-0.765-3.071,2.337-2.12,3.878 c-0.559,2.651-1.76,5.147-1.273,8.471c1.577-1.102,2.109-3.211,2.545-5.41c0.793,0.465,1.217,0.946,2.228,1.021 c3.727,0.277,5.81-3.581,5.299-7.145c-0.452-3.157-3.722-4.764-7.21-4.388C2.869,0.352,0.12,2.498,0.006,5.565 C-0.063,7.438,0.488,8.844,2.34,9.239z"/>
                  </svg>
                </a>
                <a className="social-btn google-plus" target="_blank"
                  href="https://plus.google.com/u/0/110479061425529635009">
                  <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.146 14">
                    <path d="M7.034,5.998c-0.002,0.795,0,1.591,0.003,2.386c1.343,0.042,2.685,0.022,4.026,0.042
                      c-0.593,2.96-4.639,3.917-6.775,1.986c-2.2-1.693-2.096-5.411,0.19-6.984C6.08,2.157,8.351,2.471,9.952,3.572
		c0.626-0.579,1.215-1.197,1.78-1.839c-1.328-1.056-2.959-1.808-4.698-1.727C3.411-0.115,0.079,3.044,0.019,6.649
		c-0.231,2.947,1.718,5.839,4.469,6.882c2.741,1.049,6.253,0.335,8.001-2.116c1.157-1.547,1.406-3.539,1.27-5.411
		C11.516,5.988,9.277,5.991,7.034,5.998z M20.139,5.988c-0.004-0.666-0.007-1.333-0.014-1.999h-1.998
		c-0.005,0.665-0.014,1.329-0.016,1.999c-0.672,0.003-1.339,0.006-2.01,0.013v1.987c0.671,0.008,1.341,0.015,2.01,0.021
		c0.009,0.667,0.009,1.331,0.016,1.995h1.998c0.007-0.664,0.01-1.328,0.014-1.997C20.812,8,21.479,7.997,22.146,7.988V6.001
		C21.479,5.994,20.809,5.994,20.139,5.988z"/>
</svg>

                </a>
                {/*<a className="social-btn vkontakte" target="_blank" href="https://vk.com/abbigli">
                <svg className="icon">
                  <use href="#vkontakte"></use>
                </svg>
              </a>
              <a className="social-btn odnoklassniki" target="_blank" href="https://ok.ru/profile/571557312137">
                <svg className="icon">
                  <use href="#odnoklassniki"></use>
                </svg>
              </a>*/}
              </div>
            </div>
          </div>
        </div>

        <Link
          className="header__menu-item create-post"
          onClick={() => { !isAuthenticated && dispatch(loginPopup(true)) }}
          to={(isAuthenticated && this.props.me) ? `/post/new` : ''}
        >
          <div className="icon-wrap">
            <div className="icon"></div>
            <div className="menu__item-name">{__t('Create')}</div>
          </div>
        </Link>

        {
          !isAuthenticated &&
          <a className="header__menu-item login" onClick={this.openLogin}>
            <div className="icon-wrap">
              <div className="icon"></div>
              <div className="menu__item-name">{__t('Login')}</div>
            </div>
          </a>
        }


        <div
          className={"header__menu-item " + (isAuthenticated ? 'you' : 'registration')}
          onClick={this.openRegister}
        >
          {
            isAuthenticated
              ?
              <div className="icon"
                style={
                  this.props.me.id != 0 ?
                    (
                      this.props.me.avatar
                        ? { width: "30px", height: "30px", backgroundSize: 'cover', backgroundPosition: '50% 50%', backgroundImage: `url(${this.props.me.avatar})`, marginTop: "14px" }
                        : {}
                    )
                    :
                    { backgroundImage: 'none' }
                } />
              :
              <div className="icon" />
          }

          <div className="menu__item-name">{(isAuthenticated) ? __t('You') : __t('sign.up')}</div>
        </div>

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
            <a onClick={() => this.props.onLogoutClick()} className="user-menu__item logout">
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
}

function mapStateToProps(state) {
  const sections = (state.Sections) || { isFetching: true, items: [] };
  const auth = (state.Auth) || { me: null, isAuthenticated: false, };

  return {
    isAuthenticated: auth.isAuthenticated,
    me: auth.me,
    itemsSections: sections.items,
    isFetchingSections: sections.isFetching,
  }
}

export default connect(mapStateToProps)(AvatarBlock)
