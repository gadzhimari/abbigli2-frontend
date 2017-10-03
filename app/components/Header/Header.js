import React from 'react';

import { pure } from 'recompose';

import { Link } from 'components';
import SubMenu from './SubMenu';

import { __t } from '../../i18n/translator';

import './Header.styl';

function Header(props) {
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
        {props.children}
      </div>
      <SubMenu />
    </header>
  );
}

export default pure(Header);
