import { React, PureComponent, Type, cn } from '../../components-lib/__base';

import { SocialNetworks, Link } from '../../components-lib';
import IconYoutube from '../../icons/youtube';

import { socialGroupsUrl } from '../../config';
import pages from '../../lib/pages';
import { __t } from './../../i18n/translator';

import './Footer.less';

@cn('Footer')
class Footer extends PureComponent {
  static propTypes = {
    openPopup: Type.func.isRequired,
  };

  render(cn) {
    const { openPopup } = this.props;

    return (
      <footer className={cn('')}>
        <div className={cn('wrap')}>
          <Link
            className={cn('logo')}
            to={pages.ROOT_PAGE.path}
          />
          <div className={cn('links')}>
            <span className={cn('copyright')}>
              © 2017 {__t('footer.abbigli')}
            </span>
            <Link
              className={cn('link')}
              to={`/${pages.ABOUT_PAGE.path}`}
              rel="nofollow"
              text={__t('About')}
            />
            <Link
              className={cn('link')}
              to={`/${pages.AGREEMENT_PAGE.path}`}
              rel="nofollow"
              text={__t('Agreement')}
            />
            <Link
              className={cn('link')}
              to={`/${pages.FAQ_PAGE.path}`}
              rel="nofollow"
              text={__t('FAQ')}
            />
            <Link
              className={cn('link', { support: true })}
              name="supportPopup"
              onClick={openPopup}
              rel="nofollow"
              text={__t('Support')}
            />
            <Link
              className={cn('link', { youtube: true })}
              to={socialGroupsUrl.youtube}
              label="YouTube"
              target={'_blank'}
              icon={
                <IconYoutube />
              }
            />
          </div>
          <SocialNetworks
            className={cn('social-networks')}
          />
        </div>
      </footer>
    );
  }
}

export default Footer;
