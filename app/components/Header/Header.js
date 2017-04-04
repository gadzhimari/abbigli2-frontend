import React from 'react';

import {
  Link,
} from 'components';

import './Header.styl';

function Header(props) {
  return (
    <header className="header">
      <div className="header__content">
        <Link className="logo" to="/">Logo</Link>
        {props.children}
      </div>
    </header>
  );
}

export default Header;