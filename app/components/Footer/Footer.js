import React from 'react';
import { __t } from './../../i18n/translator';

import './Footer.styl';

const Footer = props => (
  <footer className="footer">
    <div className="footer-content">
      <a className="footer-logo" href="#"></a>
      <div className="footer-menu">
        <noindex>
          <a className="footer-menu__item" href="/page/about">
            {__t('About')}
          </a>
        </noindex>
        <noindex>
          <a className="footer-menu__item" href="/page/faq">
            {__t('FAQ')}
          </a>
        </noindex>
        <span
          className="footer-menu__item"
          data-type="supportPopup"
          onClick={props.openPopup}
        >
          {__t('Support')}
        </span>
      </div>

      <div className="footer-rightcol">
        <div className="footer-copyright">
          © Abbigli, 2017
          </div>
      </div>
    </div>
  </footer>
);

export default Footer;
