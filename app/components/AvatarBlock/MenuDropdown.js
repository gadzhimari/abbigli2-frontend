import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dropdown from '../_basicClasses/Dopdown';
import { Menu } from '../../components';

import { gaSendClickEvent } from '../../lib/analitics';
import bindMethods from '../../lib/bindMethods';

class MenuDropdown extends Dropdown {
  constructor(props) {
    super(props);

    bindMethods(this, ['toggle', 'onOpen', 'onDropdownClick']);
  }

  onOpen() {
    gaSendClickEvent('menu', 'menu');
  }

  toggle() {
    if (window.innerWidth <= 768) {
      this.props.openMobileMenu();
      return;
    }

    super.toggle();
  }

  onDropdownClick({ target }) {
    if (target.tagName.toLowerCase() === 'a') {
      this.close();
    }
  }

  render() {
    const { modalButtonClick } = this.props;
    const dropdownClass = classNames('header__menu-item main-menu', {
      'open-menu': this.state.opened,
    });

    return (
      <div
        className={dropdownClass}
        ref={(root) => { this.root = root; }}
      >
        <button
          className="main-menu__opener"
          onClick={this.toggle}
        >
          <svg className="icon" viewBox="0 0 16 12">
            <path d="M0,12v-2h16v2H0z M0,5h16v2H0V5z M0,0h16v2H0V0z" />
          </svg>
        </button>

        <div className="dropdown-corner" />

        <Menu
          wrapperClass="dropdown"
          modalButtonClick={modalButtonClick}
          closeMenu={this.onDropdownClick}
        />
      </div>

    );
  }
}

MenuDropdown.propTypes = {
  modalButtonClick: PropTypes.func.isRequired,
  openMobileMenu: PropTypes.func.isRequired,
};

export default MenuDropdown;
