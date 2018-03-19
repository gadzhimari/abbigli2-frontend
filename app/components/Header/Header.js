import { React, PureComponent } from '../../components-lib/__base';

import { Link } from '../../components';
import SubMenu from './SubMenu';

import { __t } from '../../i18n/translator';

import './Header.styl';

class Header extends PureComponent {
  render() {
    return (
      <header className="header">
        <div className="main__overlay" />
        <div className="header__content">
          <Link
            to="/"
            className="logo"
          >
            <img
              src="/images/svg/logo.svg"
              alt={__t('handmade')}
            />
          </Link>
          {this.props.children}
        </div>
        <SubMenu />
      </header>
    );
  }
}

export default Header;
