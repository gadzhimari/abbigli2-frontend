import React, { Component, PropTypes } from 'react';
import Hammer from 'react-hammerjs';

import { Menu } from 'components';

class ContentWrapper extends Component {
  onSwipeHandler = () => this.props.closeMenu();

  render() {
    const {
      contentWrapperClass,
      children,
      modalButtonClick,
      itemsSections,
      isFetchingSections,
      isOpenMenu,
      closeMenu,
    } = this.props;

    const menuWrapperClass = isOpenMenu
      ? 'mobile-menu mobile-menu--active'
      : 'mobile-menu';
    const contentClass = isOpenMenu
      ? `${contentWrapperClass} mobile-menu__current menu-opened`
      : `${contentWrapperClass} mobile-menu__current`;
    const overlayClass = isOpenMenu
      ? 'mobile-menu__overlay mobile-menu__overlay--active'
      : 'mobile-menu__overlay';

    return (
      <Hammer
        onSwipe={this.onSwipeHandler}
        direction="DIRECTION_LEFT"
      >
        <div className="global-wrapper">
          <div
            className={overlayClass}
            onClick={closeMenu}
          />
          <Menu
            modalButtonClick={modalButtonClick}
            itemsSections={itemsSections}
            isFetchingSections={isFetchingSections}
            wrapperClass={menuWrapperClass}
            closeMenu={closeMenu}
          />
          <div
            className={contentClass}
            ref={(content => (this.content = content))}
          >
            {children}
          </div>
        </div>
      </Hammer>
    );
  }
}

ContentWrapper.propTypes = {
  contentWrapperClass: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  closeMenu: PropTypes.func.isRequired,
  modalButtonClick: PropTypes.func.isRequired,
  itemsSections: PropTypes.array.isRequired,
  isFetchingSections: PropTypes.bool.isRequired,
  isOpenMenu: PropTypes.bool.isRequired,
};

export default ContentWrapper;
