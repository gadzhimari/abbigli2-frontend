import React, { Component } from 'react';

import { SocialGroups } from 'components';
import { Link } from 'react-router';
import { __t } from '../../i18n/translator';

import './Menu.styl';

class Menu extends Component {
  static defaultProps = {
    closeMenu: () => true,
  };

  render() {
    const {
      isFetchingSections,
      itemsSections,
      modalButtonClick,
      wrapperClass,
      closeMenu,
    } = this.props;

    return (
      <div
        className={wrapperClass}
        ref={wrapper => (this.wrapper = wrapper)}
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
          <div className="main-menu__item">
            <div className="icon icon-sections" />
            <div className="main-menu__item-name">{__t('Sections')}</div>
            <div className="main-menu__item-corner" />
          </div>
        </div>
        <div className="main-menu__sections">
          {
            (!isFetchingSections && itemsSections.length > 0)
            && itemsSections.map(item => (<Link
              className="main-menu__section"
              to={`/sections/${item.slug}`}
              key={`section--${item.slug}`}
            >
              {item.title}
            </Link>
            ))
          }

        </div>
        <div className="main-menu__footer">
          <Link className="main-menu__footer-item" to="/page/about">{__t('About')}</Link>
          <Link className="main-menu__footer-item" to="/page/faq">{__t('FAQ')}</Link>
          <a
            className="main-menu__footer-item"
            onClick={modalButtonClick}
            data-type="supportPopup"
          >
            {__t('Support')}
          </a>

          <SocialGroups />

        </div>
      </div>
    );
  }
}

export default Menu;
