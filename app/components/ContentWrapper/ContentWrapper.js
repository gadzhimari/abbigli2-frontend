import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Hammer from 'react-hammerjs';

import { Menu, Footer } from 'components';

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
      openPopup,
    } = this.props;

    const menuWrapperClass = isOpenMenu
      ? 'mobile-menu mobile-menu--active'
      : 'mobile-menu';
    const overlayClass = isOpenMenu
      ? 'mobile-menu__overlay mobile-menu__overlay--active'
      : 'mobile-menu__overlay';

    return (
      <div className="mobile-menu__current">
        <Hammer
          onSwipe={this.onSwipeHandler}
          direction="DIRECTION_LEFT"
        >
          <div
            className={overlayClass}
            onClick={closeMenu}
          >
            <Menu
              modalButtonClick={modalButtonClick}
              itemsSections={itemsSections}
              isFetchingSections={isFetchingSections}
              wrapperClass={menuWrapperClass}
              closeMenu={closeMenu}
            />
          </div>
        </Hammer>
        <div className={contentWrapperClass}>
          {children}
        </div>
        <Footer
          openPopup={openPopup}
        >
          Logo
        </Footer>
      </div>
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
