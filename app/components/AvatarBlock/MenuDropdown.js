import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Menu } from 'components';

class MenuDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
    };
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      const openMenuContainer = document.querySelector('.main-menu');
      const dropdown = document.querySelector('.dropdown');

      if (!openMenuContainer || !dropdown) return;

      if (!openMenuContainer.contains(e.target) || dropdown.contains(e.target)) {
        this.closeDropdownHandler();
      }
    });
  }

  openDropdownHandler = ({ target, currentTarget }) => {
    if (this.state.openDropdown && target !== currentTarget) return;

    this.setState({
      openDropdown: true,
    });
  }

  closeDropdownHandler = () => this.setState({
    openDropdown: false,
  });

  render() {
    const { isFetchingSections, itemsSections, modalButtonClick, openMobileMenu } = this.props;
    const dropdownClass = classNames('header__menu-item main-menu', {
      'open-menu': this.state.openDropdown,
    });
    const isMobile = window.innerWidth <= 700;
    const menuButtonHandler = isMobile
      ? openMobileMenu
      : this.openDropdownHandler;

    return (
      <div
        className={dropdownClass}
        onClick={menuButtonHandler}
      >
        <svg className="icon" viewBox="0 0 16 12">
          <path d="M0,12v-2h16v2H0z M0,5h16v2H0V5z M0,0h16v2H0V0z" />
        </svg>
        <div className="dropdown-corner" />
        <Menu
          wrapperClass="dropdown"
          isFetchingSections={isFetchingSections}
          itemsSections={itemsSections}
          modalButtonClick={modalButtonClick}
        />
      </div>

    );
  }
}

MenuDropdown.propTypes = {
  isFetchingSections: PropTypes.bool.isRequired,
  itemsSections: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalButtonClick: PropTypes.func.isRequired,
  openMobileMenu: PropTypes.func.isRequired,
};

export default MenuDropdown;
