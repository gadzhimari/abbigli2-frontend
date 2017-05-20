import React from 'react';
import { __t } from './../../i18n/translator';

import './Footer.styl';

const Footer = props => (
  <footer className="footer">
    <div className="footer-content">
      <a className="footer-logo" href="#"></a>
      <div className="footer-menu">
        <a className="footer-menu__item" href="/page/about">
          {__t('About')}
        </a>
        <a className="footer-menu__item" href="/page/faq">
          {__t('FAQ')}
        </a>
        <span
          className="footer-menu__item"
          data-type="supportPopup"
          onClick={props.openPopup}
        >
          {__t('Support')}
        </span>
        <a
          className="footer-menu__item"
          href="#"
        >
          {__t('Sell on Abbigli')}
        </a>
      </div>

      <div className="footer-rightcol">
        <a
          className="footer-rightcol_item"
          href="#"
        >
          {__t('Policy privacy')}
        </a>
        <div className="footer-copyright">
          © 2016 Abbigli
          </div>
      </div>
    </div>
  </footer>
);

export default Footer;
