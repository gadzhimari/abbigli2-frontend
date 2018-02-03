import React from 'react';
import PropTypes from 'prop-types';

import { SocialGroups } from '../../components';

import { socialGroupsUrl } from '../../config';
import { __t } from './../../i18n/translator';

import './Footer.less';

const Footer = ({ openPopup }) => (
  <footer className="footer">
    <div className="main__overlay" />
    <div className="footer__content">
      <a className="logo-gray" href="/" />
      <div className="footer__links">
        <span className="footer__copyright">
          © 2017 {__t('footer.abbigli')}
        </span>
        <noindex>
          {/*
            <a className="footer__link" href="/page/about">
              {__t('About')}
            </a>
          */}
          <a className="footer__link" href="/page/faq">
            {__t('FAQ')}
          </a>
          <a
            className="footer__link footer__link_help"
            data-type="supportPopup"
            onClick={openPopup}
          >
            {__t('Support')}
          </a>
        </noindex>
        {/* <a className="footer__link footer__link_blog">Аббигли блог</a> */}
        <a
          className="footer__youtube"
          href={socialGroupsUrl.youtube}
        />
      </div>
      <SocialGroups
        wrapperClassName="social-networks"
      />
    </div>
  </footer>
);

Footer.propTypes = {
  openPopup: PropTypes.func.isRequired,
};

export default Footer;
