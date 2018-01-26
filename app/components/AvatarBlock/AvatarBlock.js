import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Link from 'react-router/lib/Link';
import MenuDropdown from './MenuDropdown';
import UserMenu from './UserMenu';

import { openPopup } from '../../ducks/Popup/actions';
import { stagedPopup } from '../../ducks/Auth/authActions';

import { gaSendClickEvent } from '../../lib/analitics';

import './AvatarBlock.styl';

class AvatarBlock extends Component {
  onCreatePostClick = () => {
    gaSendClickEvent('menu', 'add');
  }

  onRegistrationClick = () => {
    gaSendClickEvent('menu', 'signin_up');
    this.props.registerPopup();
  }

  onModalButtonClick = ({ currentTarget }) => {
    const type = currentTarget.dataset.type || currentTarget.name;
    this.props.openPopup(type);
  }

  onChatClick = () => {
    gaSendClickEvent('menu', 'chat');
  }

  render() {
    const { isFetchingSections,
            itemsSections,
            isAuthenticated,
            toggleMenu,
            onLogoutClick } = this.props;

    return (
      <div className="header__menu">
        <div
          className="header__menu-item search-mobile"
          onClick={this.onModalButtonClick}
          data-type="searchPopup"
        >
          <svg className="icon" viewBox="0 0 57.9 58">
            <g id="XMLID_2_">
              <path id="XMLID_9_" className="st0" d="M43.5,21.7C43.5,9.7,33.7,0,21.7,0C9.7,0,0,9.7,0,21.7s9.7,21.7,21.7,21.7 C33.7,43.5,43.5,33.7,43.5,21.7z M21.7,38.5C12.5,38.5,5,31,5,21.7S12.5,5,21.7,5s16.7,7.5,16.7,16.7S31,38.5,21.7,38.5z" />
              <path id="XMLID_10_" className="st0" d="M56.3,48.8L43.1,35.5c-2,3-4.6,5.6-7.7,7.5l13.3,13.4c2.1,2.1,5.5,2.1,7.6,0l0,0 C58.4,54.3,58.4,50.9,56.3,48.8z" />
            </g>
          </svg>
        </div>

        <MenuDropdown
          itemsSections={itemsSections}
          isFetchingSections={isFetchingSections}
          modalButtonClick={this.onModalButtonClick}
          openMobileMenu={toggleMenu}
        />

        {isAuthenticated &&
          <Link
            className="header__menu-item create-post"
            to="/post/new"
          >
            <svg className="icon" viewBox="0 0 28 28">
              <path className="st0" d="M25.6,16.4h-9.2v9.2c0,1.3-1.1,2.4-2.4,2.4c-1.3,0-2.4-1.1-2.4-2.4v-9.2H2.4C1.1,16.4,0,15.3,0,14 c0-1.3,1.1-2.4,2.4-2.4h9.2V2.4C11.6,1.1,12.7,0,14,0c1.3,0,2.4,1.1,2.4,2.4v9.2h9.2c1.3,0,2.4,1.1,2.4,2.4 C28,15.3,26.9,16.4,25.6,16.4z" />
            </svg>
          </Link>
        }

        {!isAuthenticated &&
          <div
            className="header__menu-item login"
            onClick={this.onRegistrationClick}
          >
            <svg className="icon" viewBox="0 0 14 26">
              <path className="st0" d="M11,12.7L13,26H1l2-13.3C1.2,11.5,0,9.4,0,7c0-3.9,3.1-7,7-7s7,3.1,7,7C14,9.4,12.8,11.5,11,12.7z" />
            </svg>
          </div>
        }

        {isAuthenticated &&
          <Link className="header__menu-item" to="/chat">
            <svg className="icon icon-messages" viewBox="0 0 25 23">
              <path d="M21.4,13.6l-0.2,4.6l-3.8-3.1c-0.4,0.1-0.9,0.1-1.3,0.1c-5,0-9-3.4-9-7.6c0-4.2,4-7.6,9-7.6s9,3.4,9,7.6 C25,10.1,23.6,12.2,21.4,13.6z M15.4,16.7c0.3,0,0.7,0,1,0c-1.6,2-4.3,3.3-7.4,3.3c-0.5,0-0.9,0-1.3-0.1L3.8,23l-0.2-4.6 C1.4,17,0,14.9,0,12.4c0-3.3,2.5-6.1,6-7.1c-0.4,0.9-0.6,1.9-0.6,3C5.3,12.9,9.8,16.7,15.4,16.7z"/>
            </svg>
          </Link>
        }

        {isAuthenticated &&
          <UserMenu
            user={this.props.me}
            onLogoutClick={onLogoutClick}
          />
        }
      </div>
    );
  }
}

AvatarBlock.propTypes = {
  itemsSections: PropTypes.arrayOf(PropTypes.object),
  isFetchingSections: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  toggleMenu: PropTypes.func,
  openPopup: PropTypes.func,
  registerPopup: PropTypes.func,
  onLogoutClick: PropTypes.func,
  me: PropTypes.shape({
    id: PropTypes.number,
  }),
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    me: state.Auth.me,
  };
}

function mapDispatch(dispatch) {
  return {
    registerPopup: () => dispatch(stagedPopup('register')),
    openPopup: type => dispatch(openPopup(type)),
  };
}

export default connect(mapStateToProps, mapDispatch)(AvatarBlock);
