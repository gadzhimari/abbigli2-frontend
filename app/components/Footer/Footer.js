import { React, PureComponent, Type } from '../../components-lib/__base';

import { SocialGroups, Link } from '../../components';

import { socialGroupsUrl } from '../../config';
import pages from '../../lib/pages';
import { __t } from './../../i18n/translator';

import './Footer.less';

class Footer extends PureComponent {
  static propTypes = {
    openPopup: Type.func.isRequired,
  };

  render() {
    const { openPopup } = this.props;

    return (
      <footer className="footer">
        <div className="main__overlay" />
        <div className="footer__content">
          <Link
            className="logo-gray"
            to={pages.ROOT_PAGE}
          />
          <div className="footer__links">
            <span className="footer__copyright">
              © 2017 {__t('footer.abbigli')}
            </span>
            <Link
              className="footer__link"
              to={`/${pages.ABOUT_PAGE.path}`}
              rel="nofollow"
            >
              {__t('About')}
            </Link>
            <Link
              className="footer__link"
              to={`/${pages.FAQ_PAGE.path}`}
              rel="nofollow"
            >
              {__t('FAQ')}
            </Link>
            <Link
              className="footer__link footer__link_help"
              data-type="supportPopup"
              onClick={openPopup}
              rel="nofollow"
            >
              {__t('Support')}
            </Link>
            <Link
              className="footer__youtube"
              to={socialGroupsUrl.youtube}
            />
          </div>
          <SocialGroups
            wrapperClassName="social-networks"
          />
        </div>
      </footer>
    );
  }
}

export default Footer;
