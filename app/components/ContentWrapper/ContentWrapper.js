import Hammer from 'react-hammerjs';
import { React, Component, Type } from '../../components-lib/__base';
import { Menu } from '../../components';
import { Footer } from '../../components-lib';

class ContentWrapper extends Component {
  static propTypes = {
    contentWrapperClass: Type.string.isRequired,
    children: Type.oneOfType([
      Type.string,
      Type.array,
      Type.element,
    ]).isRequired,
    closeMenu: Type.func.isRequired,
    modalButtonClick: Type.func.isRequired,
    itemsSections: Type.arrayOf(Type.object).isRequired,
    isOpenMenu: Type.bool.isRequired,
  };

  onSwipeHandler = () => this.props.closeMenu();

  render() {
    const {
      contentWrapperClass,
      children,
      modalButtonClick,
      itemsSections,
      isOpenMenu,
      closeMenu,
      openPopup,
      showFooter,
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
              wrapperClass={menuWrapperClass}
              closeMenu={closeMenu}
            />
          </div>
        </Hammer>
        <div className={contentWrapperClass}>
          {children}
        </div>
        { showFooter &&
          <Footer
            openPopup={openPopup}
          >
            Logo
          </Footer>
        }
      </div>
    );
  }
}

export default ContentWrapper;
