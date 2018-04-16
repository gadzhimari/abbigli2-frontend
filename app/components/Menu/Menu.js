/* eslint react/require-default-props: 0 */
import { React, PureComponent, Type } from '../../components-lib/__base';

import Button from '../Button/Button';
import Link from '../Link/Link';

import { SocialNetworks, Link as PostLink } from '../../components-lib';
import { socialGroupsUrl } from '../../config';
import IconYoutube from '../../icons/youtube';
import { __t } from '../../i18n/translator';

import './Menu.less';

class Menu extends PureComponent {
  static propTypes = {
    itemsSections: Type.arrayOf(Type.shape({
      id: Type.number,
      title: Type.string,
      slug: Type.string,
    })),
    wrapperClass: Type.string,
    closeMenu: Type.func,
    modalButtonClick: Type.func,
  };

  static defaultProps = {
    closeMenu: () => true,
    itemsSections: [],
  };

  render() {
    const {
      itemsSections,
      modalButtonClick,
      wrapperClass,
      closeMenu,
    } = this.props;

    return (
      <div
        className={wrapperClass}
        ref={(wrapper) => { (this.wrapper = wrapper); }}
        onClick={closeMenu}
      >
        <div className="main-menu__items">
          <Link className="main-menu__item" to="/new-products/">
            <div className="icon icon-new" />
            <div className="main-menu__item-name">{__t('New')}</div>
          </Link>

          <Link className="main-menu__item" to="/blogs/">
            <div className="icon icon-blog" />
            <div className="main-menu__item-name">{__t('Blogs')}</div>
          </Link>

          <Link className="main-menu__item" to="/popular-products/">
            <div className="icon icon-popular" />
            <div className="main-menu__item-name">{__t('Popular')}</div>
          </Link>

          <Link className="main-menu__item" to="/events/">
            <div className="icon icon-event" />
            <div className="main-menu__item-name">{__t('Events')}</div>
          </Link>

          <Link className="main-menu__item" to="/set-the-mood/">
            <div className="icon icon-mood" />
            <div className="main-menu__item-name">{__t('Create.a.mood')}</div>
          </Link>

          <Link className="main-menu__item" to="/nearest-products/">
            <div className="icon icon-beside" />
            <div className="main-menu__item-name">{__t('Nearby')}</div>
          </Link>

          {itemsSections.map(section => (
            <Link className="main-menu__item" to={section.view_on_site_url} key={section.id}>
              {section.title}
            </Link>
          ))
          }
        </div>
        <div className="main-menu__footer">
          <div className="main-menu__links">
            <Link
              className="main-menu__footer-item"
              to="/page/about"
            >
              {__t('About')}
            </Link>
            <Link
              className="main-menu__footer-item"
              to="/page/faq"
            >
              {__t('FAQ')}
            </Link>
            <Button
              className="main-menu__footer-item"
              onClick={modalButtonClick}
              name="supportPopup"
            >
              {__t('Support')}
            </Button>
          </div>

          <SocialNetworks
            className="main-menu__social-networks"
          />

          <PostLink
            className="main-menu__link_youtube"
            to={socialGroupsUrl.youtube}
            label="YouTube"
            target={'_blank'}
            icon={
              <IconYoutube />
            }
          />
        </div>
      </div>
    );
  }
}

export default Menu;
